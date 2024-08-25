import UserCard from "./user-card";

import { createClient } from "@/utils/supabase/server";

export default async function Users() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <UserCard user={user!} />;
}
