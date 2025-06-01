"use client";

import Link from "next/link";
import Image from "next/image";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useSupabase } from "./supabase-provider";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign out failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out.",
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="QurbaniMeme Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-bold text-xl">QurbaniMeme</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/settings" className="text-sm font-medium">
            <Settings className="h-4 w-4 inline-block mr-1" />
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
