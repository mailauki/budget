import { User } from "@nextui-org/user";

import Logout from "../logout-btn";

import NavList from "./list";

import { getUser } from "@/db/queries";

export async function NavSidebar() {
  const user = await getUser();

  if (!user) return <></>;

  return (
    <div
      // className="hidden sm:flex flex-col overflow-y-auto p-2 w-full max-w-xs"
      className="col-span-3"
      // style={{ maxWidth: "240px" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <NavList />
        </div>
        <div className="px-3 flex items-center">
          <User
            avatarProps={{ src: user.user_metadata.avatar_url }}
            description={<Logout />}
            name={user.user_metadata.user_name || user.email}
          />
        </div>
      </div>
    </div>
  );
}
