"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

type SupabaseContext = {
  supabase: SupabaseClient
  session: Session | null
  user: any | null
  isLoading: boolean
  isAuthEnabled: boolean
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient())
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthEnabled] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      if (!isAuthEnabled) {
        // Create a mock user when auth is disabled
        setUser({
          id: "anonymous-user",
          email: "anonymous@example.com",
          user_metadata: {
            full_name: "Anonymous User",
          },
        })
        setIsLoading(false)
        return
      }

      const {
        data: { session }
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    if (isAuthEnabled) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
        router.refresh()
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [supabase, router, isAuthEnabled])

  return <Context.Provider value={{ supabase, session, user, isLoading, isAuthEnabled }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

