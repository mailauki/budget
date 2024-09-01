"use client";

import { User } from "@nextui-org/react";
import React from "react";
import { User as UserType } from "@supabase/supabase-js";

import { logout } from "@/app/auth/actions";
// import { getUser } from "@/db/queries";

export default async function UserCard({ user }: { user: UserType }) {
  return (
    <User
      avatarProps={{
        src: user.user_metadata?.avatar_url || "",
      }}
      className="justify-start mb-4"
      description={
        <form action={logout}>
          <button
            className="text-sm text-gray-400 hover:underline hover:text-gray-300"
            type="submit"
          >
            Logout
          </button>
        </form>
      }
      name={user.user_metadata?.user_name || user.email}
    />
  );
}
