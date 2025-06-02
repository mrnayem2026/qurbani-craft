"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Information</CardTitle>
              <CardDescription>About QurbaniCraft</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Features</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-5 space-y-1 mt-2">
                    <li>Unlimited image uploads</li>
                    <li>Access to 300+ Google Fonts</li>
                    <li>Advanced text customization</li>
                    <li>Text positioning behind images</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Information about your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Data Privacy</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We only store the data necessary to provide our services. Your images and text are stored securely.
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Local Storage</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Some data may be stored in your browser's local storage for a better user experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

