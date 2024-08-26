"use client";

import {
  Checkbox,
  Chip,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDateFormatter, useNumberFormatter } from "@react-aria/i18n";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import { Transaction } from "@/types";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  let formatter = useDateFormatter({ dateStyle: "full" });
  const formatterAmount = useNumberFormatter({
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });

  const sortedTransactions = React.useMemo(() => {
    return [...transactions].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Transaction] as number;
      const second = b[sortDescriptor.column as keyof Transaction] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, transactions]);

  const renderCell = React.useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];

      switch (columnKey) {
        case "name":
          return transaction.name;
        case "date":
          return transaction.date
            ? formatter.format(
                parseDate(`${transaction.date}`).toDate(getLocalTimeZone()),
              )
            : "--";
        case "category":
          return <Chip variant="flat">{transaction.category}</Chip>;
        case "credit":
          return (
            <Checkbox
              disabled
              color="default"
              isSelected={transaction.credit}
            />
          );
        case "amount":
          return formatterAmount.format(transaction.amount);
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      fullWidth
      aria-label="Transactions table"
      radius="sm"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <TableColumn
          key="name"
          allowsSorting
          align="start"
          className="uppercase"
        >
          Name
        </TableColumn>
        <TableColumn
          key="date"
          allowsSorting
          align="start"
          className="uppercase"
        >
          Date
        </TableColumn>
        <TableColumn key="category" align="start" className="uppercase">
          Category
        </TableColumn>
        <TableColumn key="credit" align="center" className="uppercase">
          Credit
        </TableColumn>
        <TableColumn
          key="amount"
          allowsSorting
          align="end"
          className="uppercase"
        >
          Amount
        </TableColumn>
      </TableHeader>
      <TableBody items={sortedTransactions}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
