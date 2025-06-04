import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"
import { SubscriptionProvider } from "@/components/subscription-provider"
import { fonts, fontVariables } from "@/lib/fonts-config"

export const metadata = {
  title: "QurbaniCraft",
  description: "Create beautiful Qurbani/Eid-ul-Adha themed images with customizable text and designs",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts.inter.className} ${fontVariables}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SupabaseProvider>
            <SubscriptionProvider>
              {children}
              <Toaster />
            </SubscriptionProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}