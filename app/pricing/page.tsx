"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { useSubscription } from "@/components/subscription-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

export default function PricingPage() {
  const { supabase, user, isLoading: isUserLoading } = useSupabase()
  const { tier, isLoading: isSubscriptionLoading } = useSubscription()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const router = useRouter()

  const handleSubscribe = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      setIsCreatingCheckout(true)

      // Create a Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: "Failed to create checkout session.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingCheckout(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setIsCreatingCheckout(true)

      // Create a Stripe customer portal session
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create portal session")
      }

      const { url } = await response.json()

      // Redirect to Stripe Customer Portal
      window.location.href = url
    } catch (error) {
      console.error("Error creating portal session:", error)
      toast({
        title: "Error",
        description: "Failed to access subscription management.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingCheckout(false)
    }
  }

  const isLoading = isUserLoading || isSubscriptionLoading || isCreatingCheckout

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-500 dark:text-gray-400">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>For casual users</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">forever</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Upload up to 5 images</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Add unlimited text layers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Access to 10 fonts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Basic text customization</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!user ? (
                <Button asChild className="w-full">
                  <Link href="/login">Sign Up</Link>
                </Button>
              ) : tier === "free" ? (
                <Button disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleManageSubscription} disabled={isLoading}>
                  Downgrade
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-primary">
            <CardHeader>
              <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-fit mb-2">
                RECOMMENDED
              </div>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For professionals and creators</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">per month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited image uploads</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Add unlimited text layers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Access to 300+ Google Fonts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced text customization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!user ? (
                <Button asChild className="w-full">
                  <Link href="/login">Sign Up</Link>
                </Button>
              ) : tier === "premium" ? (
                <Button variant="outline" className="w-full" onClick={handleManageSubscription} disabled={isLoading}>
                  Manage Subscription
                </Button>
              ) : (
                <Button className="w-full" onClick={handleSubscribe} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Upgrade Now"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

