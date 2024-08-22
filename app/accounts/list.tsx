"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Account } from "@/types";

export default function AccountsList({ accounts }: { accounts: Account[] }) {
  return (
    <Listbox
      aria-label="List of accounts"
      disabledKeys={["none"]}
      onAction={(key) => alert(key)}
    >
      {accounts.length == 0 ? (
        <ListboxItem key="none">No accounts yet</ListboxItem>
      ) : (
        accounts.map((acc) => (
          <ListboxItem key={acc.id}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-lg">{acc.account_name}</span>
                <span className="text-small text-default-400">
                  ${acc.current_balance.toFixed(2)}
                </span>
              </div>
            </div>
          </ListboxItem>
        ))
      )}
    </Listbox>
  );
}
