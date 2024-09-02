import React from "react";
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/table";

import TransactionsTable from "./table";

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

  if (
    !transactions ||
    !dates ||
    transactions.length === 0 ||
    dates.length === 0
  ) {
    return (
      <Table aria-label="Empty transactions table">
        <TableHeader>
          <TableColumn
            key="date"
            align="start"
            className="uppercase"
            minWidth={140}
            width="50%"
          >
            Name
          </TableColumn>
          <TableColumn
            key="category"
            align="start"
            className="uppercase hidden sm:table-cell"
            width="20%"
          >
            Category
          </TableColumn>
          <TableColumn
            key="credit"
            align="center"
            className="uppercase hidden sm:table-cell"
            width="10%"
          >
            Credit
          </TableColumn>
          <TableColumn
            key="amount"
            align="end"
            className="uppercase"
            width="20%"
          >
            Amount
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No transactions yet"}>{[]}</TableBody>
      </Table>
    );
  }

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
