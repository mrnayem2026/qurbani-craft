"use client";

import Link from "next/link";
import { MoonStar, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useSupabase } from "./supabase-provider";
import { toast } from "sonner";
import { NavbarButton } from "./ui/resizable-navbar";
import UserProfile from "./user-profile";

export function DashboardHeader() {
  const { user, isLoading, supabase } = useSupabase();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Sign out failed", {
          description: error.message,
        });
      } else {
        toast.success("Signed out successfully", {
          description: "You have been signed out.",
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Sign out failed", {
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
          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <NavbarButton className="px-0 py-0 bg-transparent rounded-full shadow-none">
              <UserProfile />
            </NavbarButton>
          ) : (
            <NavbarButton variant="dark" href="/login">
              Login
            </NavbarButton>
          )}
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
