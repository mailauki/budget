import React from "react";

import TransactionsTable from "./transactions-table";

import { Transaction } from "@/types";

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
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

  return (
    <div className="flex flex-col gap-4">
      {dates.map((date) => (
        <div key={date}>
          <TransactionsTable
            date={date}
            transactions={transactions.filter((ta) => ta.date == date)}
          />
        </div>
      ))}
    </div>
  );
}
