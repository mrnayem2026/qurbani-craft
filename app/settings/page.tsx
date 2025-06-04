"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "@/components/dashboard-header";

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
              <CardDescription>
               QurbaniCraft is your all-in-one Eid toolkit—make memes, design cards, and smartly divide Qurbani meat in just a few clicks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium">App Name</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    QurbaniCraft
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1.0.0
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create memes, design cards, and divide Qurbani meat with our
                    all-in-one Eid celebration toolkit. Whether you're adding
                    fun to your feed or organizing your Qurbani portions,
                    QurbaniCraft has everything you need for a joyful and smooth
                    Eid experience.
                  </p>
                </div>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-sm font-medium">Release Date</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      June 5, 2025
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      June 5, 2025
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Tech Stack</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-5 mt-2">
                    <li>Next.js</li>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Shadcn UI</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-sm font-medium">Developer</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      MR Nayem
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Contact / Support</p>
                    <a
                      href="mailto:mrnayem2026@gmail.com"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      mrnayem2026@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
