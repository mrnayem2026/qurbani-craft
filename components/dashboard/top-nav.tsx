"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useEffect } from "react"
import { useState } from "react"
import { useSupabase } from "../supabase-provider"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "QurbaniCraft", href: "#" },
    { label: "dashboard", href: "#" },
  ]
  const { supabase } = useSupabase();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log(user?.user_metadata.avatar_url);
    };
    fetchUser();
  }, [supabase]);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between  border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src={user?.user_metadata.avatar_url}
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 name={user?.user_metadata.name}  avatar={user?.user_metadata.avatar_url} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
