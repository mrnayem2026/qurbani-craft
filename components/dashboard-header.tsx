"use client";

import Link from "next/link";
import Image from "next/image";
import { MoonStar, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useSupabase } from "./supabase-provider";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const { supabase } = useSupabase();
  const { toast } = useToast();

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
          <MoonStar className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold text-primary">
            QurbaniCraft
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button onClick={handleSignOut}>Log Out</Button>
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
