"use client";

import Link from "next/link";
import { MoonStar } from "lucide-react";
import { useSupabase } from "./supabase-provider";
import { NavbarButton } from "./ui/resizable-navbar";
import UserProfile from "./user-profile";

export function DashboardHeader() {
  const { user, isLoading } = useSupabase();

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
