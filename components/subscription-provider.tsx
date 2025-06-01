"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type SubscriptionTier = "free" | "premium"

type SubscriptionContext = {
  tier: SubscriptionTier
  isLoading: boolean
  remainingUploads: number
  maxUploads: number
  availableFonts: number
  checkSubscription: () => Promise<void>
}

const Context = createContext<SubscriptionContext | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  // Always set to premium with unlimited uploads
  const [tier] = useState<SubscriptionTier>("premium")
  const [isLoading] = useState(false)
  const [remainingUploads] = useState(Number.POSITIVE_INFINITY)
  const [maxUploads] = useState(Number.POSITIVE_INFINITY)
  const [availableFonts] = useState(300)

  const checkSubscription = async () => {
    // No-op function since everything is free
    return Promise.resolve()
  }

  return (
    <Context.Provider
      value={{
        tier,
        isLoading,
        remainingUploads,
        maxUploads,
        availableFonts,
        checkSubscription,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSubscription must be used inside SubscriptionProvider")
  }
  return context
}

