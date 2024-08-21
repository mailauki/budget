import { Avatar } from "@nextui-org/avatar";
import { Card, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function UserCard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect("/login");
  // }

  return (
    <>
      {!user ? (
        <Button as={Link} href="/login" variant="solid">
          Login
        </Button>
      ) : (
        <Card className="w-full" radius="sm">
          <CardHeader className="flex gap-3">
            <Avatar src={user.user_metadata?.avatar_url || ""} />
            <div className="flex flex-col text-left gap-2 pr-2">
              <p className="text-md">
                Hello, {user.user_metadata?.user_name || user.email}
              </p>
              <form action={signOut}>
                <Button
                  className="text-small text-default-500"
                  radius="sm"
                  size="sm"
                  type="submit"
                  variant="ghost"
                >
                  Sign out
                </Button>
              </form>
            </div>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
