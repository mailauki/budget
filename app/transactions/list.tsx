"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Transaction } from "@/types";

export default async function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Listbox
      aria-label="List of transactions"
      disabledKeys={["none"]}
      onAction={(key) => alert(key)}
    >
      {transactions.length == 0 ? (
        <ListboxItem key="none">No transactions yet</ListboxItem>
      ) : (
        transactions.map((ta) => (
          <ListboxItem key={ta.id}>{ta.label}</ListboxItem>
        ))
      )}
    </Listbox>
  );
}
