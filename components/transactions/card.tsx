"use client";

import { BsCreditCard2Front } from "react-icons/bs";
import { CardHeader } from "@nextui-org/card";

import FormModal from "../modal";
import { heading } from "../primitives";

import Brand from "./brand";
import TransactionForm from "./form";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { useAccountingFormatter } from "@/utils/formatters";

export default function TransactionCard({ item }: { item: Transaction }) {
  const accountingFormatter = useAccountingFormatter();

  return (
    <FormModal
      form={<TransactionForm item={item} />}
      type="edit"
      variant="transaction"
    >
      <CardHeader className="items-center justify-between">
        <div className="flex items-start gap-5">
          <Brand transaction={item} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex items-center gap-2">
              <h4 className="text-md">{item.name}</h4>
              {item.credit && <BsCreditCard2Front />}
            </div>
            <p className={heading({ variant: "tertiary" })}>
              {`${item.category} • ${item.category_label}`}
            </p>
          </div>
        </div>
        <p
          className={`${
            categories.income.find(({ labels }) =>
              labels.find(({ name }) => name == item.category_label),
            ) && "text-green-600 dark:text-green-400"
          }`}
        >
          {accountingFormatter.format(item.amount)}
        </p>
      </CardHeader>
    </FormModal>
  );
}
