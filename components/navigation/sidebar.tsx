import NavList from "./list";

import { getUser } from "@/db/queries";

export async function NavSidebar() {
  const user = await getUser();

  if (!user) return <></>;

  return (
    <div className="fixed top-20 w-56">
      <div className="flex flex-col flex-1 h-full py-6 md:py-8">
        <NavList />
      </div>
      {/* <div className="absolute bottom-0 left-0 py-3 px-6">
        <User
          avatarProps={{ src: user.user_metadata.avatar_url }}
          description={<Logout />}
          name={user.user_metadata.user_name || user.email}
        />
      </div> */}
    </div>
  );
}
