"use client";

import { Avatar } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";

export default function NavUser({ user }: { user: User }) {
  return (
    <Avatar
      isBordered
      showFallback
      alt={user.user_metadata.name}
      className="transition-transform"
      size="sm"
      src={user.user_metadata.avatar_url}
    />
  );
}
