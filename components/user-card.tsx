"use client";
import type { User as UserType } from "@supabase/supabase-js";

import { User } from "@nextui-org/react";

import { logout } from "@/app/auth/actions";

export default function UserCard({ user }: { user: UserType }) {
  return (
    // <Card className="w-full" radius="sm">
    //   <CardHeader className="flex gap-3">
    //     <Avatar src={user.user_metadata?.avatar_url || ""} />
    //     <div className="flex flex-col text-left gap-2 pr-2">
    //       <p className="text-md">
    //         Hello, {user.user_metadata?.user_name || user.email}
    //       </p>
    //       <form action={logout}>
    //         <Button
    //           className="text-small text-default-500"
    //           radius="sm"
    //           size="sm"
    //           type="submit"
    //           variant="ghost"
    //         >
    //           Sign out
    //         </Button>
    //       </form>
    //     </div>
    //   </CardHeader>
    // </Card>

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
