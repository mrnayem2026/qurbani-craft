"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useEffect } from "react";
import { useState } from "react";
import UserProfile from "../user-profile";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function TopNav() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "QurbaniCraft", href: "/" },
    { label: "dashboard", href: "/dashboard" },
    { label: "", href: "" },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBreadcrumbs([
        { label: "QurbaniCraft", href: "/" },
        { label: "dashboard", href: "/dashboard" },
        {
          label: window.location.pathname.includes("/dashboard/")
            ? window.location.pathname.split("/").pop() || ""
            : "",
          href: window.location.pathname,
        },
      ]);
    }
  }, [window?.location.pathname]);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between  border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <ThemeToggle />
        <UserProfile />
      </div>
    </nav>
  );
}
