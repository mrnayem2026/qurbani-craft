import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") as string

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error) {
      console.error("Webhook signature verification failed:", error)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    const cookieStore = awite cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Get the subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        // Create or update the subscription in the database
        const { error } = await supabase.from("subscriptions").upsert({
          user_id: session.metadata?.userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          price_id: subscription.items.data[0].price.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })

        if (error) {
          console.error("Error updating subscription in database:", error)
        }

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        // Update the subscription in the database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)

        if (error) {
          console.error("Error updating subscription in database:", error)
        }

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        // Update the subscription in the database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
          })
          .eq("stripe_subscription_id", subscription.id)

        if (error) {
          console.error("Error updating subscription in database:", error)
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

