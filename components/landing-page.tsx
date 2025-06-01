"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabase } from "./supabase-provider"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function LandingPage() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        })
      } else {
        // Check if user was created and needs email verification
        if (data?.user?.identities?.length === 0) {
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description: "Email already in use. Please try logging in instead.",
          })
        } else {
          toast({
            title: "Sign up successful",
            description: "You can now log in with your credentials.",
          })
        }
      }
    } catch (error) {
      console.error("Error signing up:", error)
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "An unexpected error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        })
      } else {
        toast({
          title: "Sign in successful",
          description: "Redirecting to editor...",
        })
        // Force a refresh to trigger the redirect in the root page
        window.location.href = "/editor"
      }
    } catch (error) {
      console.error("Error signing in:", error)
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "An unexpected error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold">TextBackdrop</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Add Beautiful Text Behind Your Images
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Upload your images and add customizable text behind them. Adjust font, size, color, position, and
                  more.
                </motion.p>
              </div>
              <motion.div
                className="mx-auto lg:mr-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="w-full max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Sign in or create an account to continue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="signin" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      <TabsContent value="signin">
                        <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Password</Label>
                              <Link href="/reset-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create stunning text-behind-image designs
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full p-3 bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Unlimited Text Layers</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Add as many text layers as you need to create complex designs
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full p-3 bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                      <line x1="4" x2="4" y1="22" y2="15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">300+ Premium Fonts</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Access to over 300 Google Fonts with premium subscription
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full p-3 bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 2v8L8.5 7 6 9.5 10 14l-4 4.5 2.5 2.5L12 17.5l3.5 3.5 2.5-2.5-4-4.5 4-4.5-2.5-2.5L12 10V2Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Advanced Customization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Control position, size, color, opacity, rotation, and tilt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TextBackdrop. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

