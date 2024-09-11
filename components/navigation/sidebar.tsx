"use client";

import { usePathname } from "next/navigation";

import NavList from "./list";

export function NavSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
	console.log(pathname)

  return (
    <>
      {pathname === "/login" ||
      pathname === "/error" ||
      pathname === "/_error" ||
      pathname === "/_not-found" ? (
        <div>{children}</div>
      ) : (
        <>
          <div className="hidden lg:flex gap-3">
            <div className="fixed top-20 w-56">
              <div className="flex flex-col flex-1 h-full py-6 md:py-8">
                <NavList />
              </div>
            </div>

            <div className="w-full ml-60">{children}</div>
          </div>
          <div className="flex lg:hidden">{children}</div>
        </>
      )}
    </>
  );
}
