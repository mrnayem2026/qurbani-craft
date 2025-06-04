"use client"
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import Image from "next/image";
import Profile01 from "./dashboard/profile-01";
import { useSupabase } from "./supabase-provider";

const UserProfile = () => {
    const { supabase } = useSupabase();
    const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.user_metadata.avatar_url);
      };
      fetchUser();
    }, [supabase]);
  return (
    <>
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
          <Profile01
            name={user?.user_metadata.name}
            avatar={user?.user_metadata.avatar_url}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserProfile;
