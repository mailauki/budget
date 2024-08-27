"use client";

import {
  Chip,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
} from "@nextui-org/react";
import React from "react";

import { expenses } from "@/utils/helpers";

export default function CategoryPopover({ category }: { category: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([category]),
  );

  const selectedCategory = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  React.useEffect(() => {
    if (category !== selectedCategory) setIsOpen(false);
    // add db edit function
  }, [category, selectedCategory]);

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Chip as="button" variant="flat">
          {category}
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Listbox
          disallowEmptySelection
          className="p-0 [&_ul]:p-2"
          classNames={{
            base: "max-w-xs",
            list: "max-h-[300px] overflow-y-scroll",
          }}
          // defaultSelectedKeys={
          //   new Set(transaction.category) as Selection
          // }
          items={expenses}
          label="Selected category"
          selectedKeys={selectedKeys}
          selectionMode="single"
          topContent={
            <div className="p-3">
              <Chip>{selectedCategory}</Chip>
            </div>
          }
          variant="flat"
          onSelectionChange={setSelectedKeys}
        >
          {(item) => <ListboxItem key={item.name}>{item.name}</ListboxItem>}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
