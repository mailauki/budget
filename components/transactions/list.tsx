"use client";

import React from "react";
import {
  parseDate,
  isSameMonth,
  getLocalTimeZone,
} from "@internationalized/date";
import { Listbox } from "@nextui-org/listbox";

import { heading } from "../primitives";

import TransactionCard from "./card";

import { Transaction } from "@/types";
import { useDateMediumFormatter } from "@/utils/formatters";

export default function TransactionsList({
  transactions,
  selectedDate,
}: {
  transactions: Transaction[];
  selectedDate: string;
}) {
  const dateMediumFormatter = useDateMediumFormatter();
  const [dates, setDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    setDates(
      Array.from(
        new Set(Array.from(transactions.flatMap(({ date }) => date as string))),
      ).sort(
        (date1, date2) =>
          new Date(`${date2}`).getTime() - new Date(`${date1}`).getTime(),
      ),
    );
  }, [transactions]);

  if (
    !transactions ||
    !dates ||
    transactions.length === 0 ||
    dates.length === 0 ||
    dates.filter((date) =>
      isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
    ).length === 0
  ) {
    return (
      <Listbox
        aria-label="Empty transactions table"
        emptyContent={
          <div className="mt-3">
            <p className={heading({ variant: "secondary" })}>
              No transactions yet
            </p>
          </div>
        }
      >
        {[]}
      </Listbox>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 my-3">
        {dates
          .filter((date) =>
            isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
          )
          .map((date) => (
            <div key={date} className="flex flex-col">
              <h3 className={heading({ variant: "secondary" })}>
                {dateMediumFormatter.format(
                  parseDate(`${date}`).toDate(getLocalTimeZone()),
                )}
              </h3>
              {transactions
                .filter((item) => item.date === date)
                .map((item) => (
                  <TransactionCard key={item.id} item={item} />
                ))}
            </div>
          ))}
      </div>
    </>
  );
}
