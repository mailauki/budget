"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import Logout from "../logout-btn";

import { siteConfig } from "@/config/site";

export default function NavList() {
  const path = usePathname();

  return (
    // <div className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    <Card isBlurred radius="sm">
      <CardBody>
        <Listbox aria-label="Actions" variant="flat">
          {siteConfig.navMenuItems.map((item, index) => (
            <ListboxItem
              key={`${item}-${index}`}
              className={`text-${item.href === path ? "primary" : "foreground"}`}
              href={item.href}
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
      <CardFooter>
        <Logout />
      </CardFooter>
    </Card>
    // </div>
  );
}
