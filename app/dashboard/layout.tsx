"use client"
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/dashboard/sidebar";
import TopNav from "@/components/dashboard/top-nav";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <html lang="en">
      <body className={cn("antialiased min-h-screen flex flex-col")}>
        <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
          <Sidebar />
          <div className="w-full flex flex-1 flex-col">
            <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
              <TopNav />
            </header>
            <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
