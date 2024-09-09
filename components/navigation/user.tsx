"use client";

import { Avatar } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";

export default function NavUser({ user }: { user: User }) {
  return (
    <Avatar
      isBordered
      className="transition-transform"
      color="primary"
      name={user.user_metadata.name}
      size="sm"
      src={user.user_metadata.avatar_url}
    />
  );
}
