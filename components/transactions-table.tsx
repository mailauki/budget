"use client";

import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { BsChevronDown } from "react-icons/bs";

import CategorySelect from "./category-select";

import { Transaction } from "@/types";
import { editTransaction } from "@/db/actions";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const formatter = useDateFormatter({ dateStyle: "medium" });
  const formatterFull = useDateFormatter({ dateStyle: "full" });
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
          return (
            <CategorySelect
              category={transaction.category}
              transaction={transaction}
            />
          );
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

  const topContent = React.useMemo(() => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button className="justify-between" size="lg" variant="light">
            {transactions[0].date
              ? formatterFull.format(
                  parseDate(`${transactions[0].date}`).toDate(
                    getLocalTimeZone(),
                  ),
                )
              : "--"}
            <BsChevronDown />
          </Button>
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
          selectionMode="single"
        >
          {transactions.map(({ date }) => (
            <DropdownItem key={date as keyof Transaction}>
              {formatter.format(
                parseDate(`${date}`).toDate(getLocalTimeZone()),
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }, []);

  return (
    <Table
      fullWidth
      aria-label="Transactions table"
      radius="sm"
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // onRowAction={(key) => alert(`Opening item ${key}...`)}
      // onRowAction={(key) =>
      //   editTransaction(transactions.find(({ name }) => name == key)!)
      // }
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
