import LandingPage from "@/components/landing-page"
import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"


export default async function Home() {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return <LandingPage />
}