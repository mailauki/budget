"use client";

import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import React from "react";

import { expenses } from "@/utils/categories";
// import { Transaction } from "@/types";

export default function CategorySelect({
  category,
  // transaction,
}: {
  category: string;
  // transaction: Transaction;
}) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([category]),
  );

  // const selectedCategory = React.useMemo(
  //   () => Array.from(selectedKeys).join(", "),
  //   [selectedKeys],
  // );

  return (
    <Dropdown
    // onClose={() =>
    //   editTransaction({
    //     ...transaction,
    //     category: selectedCategory,
    //   })
    // }
    >
      <DropdownTrigger>
        <Chip as="button" variant="flat">
          {category}
        </Chip>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Selected category"
        className="p-0 [&_ul]:p-2"
        classNames={{
          base: "max-w-xs",
          list: "max-h-[300px] overflow-y-scroll",
        }}
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={setSelectedKeys}
      >
        {expenses.map(({ name }) => (
          <DropdownItem key={name}>{name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
