"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

import Logout from "../logout-btn";

import { siteConfig } from "@/config/site";

export default function NavMenu({ user }: { user: User }) {
  const path = usePathname();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name="Jason Hughes"
          size="sm"
          src={user.user_metadata.avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Link Actions"
        items={siteConfig.navMenuItems}
        variant="flat"
      >
        {/* <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem> */}
        {(item) => (
          <DropdownItem
            key={item.href}
            className={
              item.label === "Logout"
                ? "text-danger"
                : item.href === path
                  ? "text-primary"
                  : "text-forground"
            }
            color={
              item.label === "Logout"
                ? "danger"
                : item.href === path
                  ? "primary"
                  : "default"
            }
            href={item.href}
            textValue={item.label}
          >
            {item.label === "Logout" ? <Logout /> : item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
