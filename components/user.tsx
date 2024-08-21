// "use client";
// import React from "react";
// import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

import { signOut } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/server";

export default async function User() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // return (
    //   <Button
    //     showAnchorIcon
    //     as={Link}
    //     color="primary"
    //     href="/login"
    //     variant="solid"
    //   >
    //     Login
    //   </Button>
    //   <Link href="/login">Login</Link>
    // );
    redirect("/login");
  }

  return (
    <div>
      <p>Hello, {user.email}</p>
      <form action={signOut}>
        {/* <Button type="submit" variant="solid">
          Sign out
        </Button> */}
        <button className="border rounded p-1.5 px-3 m-1" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
