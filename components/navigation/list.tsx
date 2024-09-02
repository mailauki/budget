"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export default function NavList() {
  const path = usePathname();

  return (
    <div className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
    </div>
  );
}
