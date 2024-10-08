"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { BsFillLayersFill } from "react-icons/bs";

import Logout from "../logout-link";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export function Navbar({ user }: { user?: React.ReactNode }) {
  const path = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* large - desktop */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <BsFillLayersFill className="-rotate-45" size={24} />
            <p className="font-bold text-inherit">Paypay</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          <Logout />
        </ul>
      </NavbarContent>

      {/* medium */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {user}
        </NavbarItem>
      </NavbarContent>

      {/* small - mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="pb-4">
        <div className="mx-4 mt-2 flex flex-col gap-2 grow">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={item.href === path ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <Logout />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
