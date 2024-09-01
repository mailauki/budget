"use client";

import { Link, NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export default function NavLinks() {
  const path = usePathname();

  return (
    <>
      {siteConfig.navItems.map((item) => (
        <NavbarItem key={item.href} isActive={path === item.href}>
          <Link
            aria-current={path === item.href ? "page" : "false"}
            color={path === item.href ? "primary" : "foreground"}
            href={item.href}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
}
