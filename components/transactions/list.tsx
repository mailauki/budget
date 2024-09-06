import React from "react";
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/table";
import { parseDate, isSameMonth } from "@internationalized/date";

import TransactionsTable from "./table";

import { Transaction } from "@/types";

export default function TransactionsList({
  transactions,
  selectedDate,
}: {
  transactions: Transaction[];
  selectedDate: string;
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
    dates.length === 0 ||
    dates.filter((date) =>
      isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
    ).length === 0
  ) {
    return (
      <Table aria-label="Empty transactions table">
        <TableHeader>
          <TableColumn key="date" align="start" className="uppercase">
            Name
          </TableColumn>
          <TableColumn
            key="category"
            align="start"
            className="uppercase hidden sm:table-cell"
          >
            Category
          </TableColumn>
          <TableColumn
            key="credit"
            align="center"
            className="uppercase hidden sm:table-cell"
          >
            Credit
          </TableColumn>
          <TableColumn key="amount" align="end" className="uppercase">
            Amount
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No transactions yet"}>{[]}</TableBody>
      </Table>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {dates
        .filter((date) =>
          isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
        )
        .map((date) => (
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
