"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import React from "react";

import { Transaction } from "@/types";

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  let formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <Table fullWidth aria-label="Transactions table" radius="sm">
      <TableHeader>
        <TableColumn className="uppercase">Name</TableColumn>
        <TableColumn className="uppercase">Date</TableColumn>
        <TableColumn className="uppercase">Amount</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No transactions to display"}>
        {transactions.map((ta) => (
          <TableRow key={ta.id}>
            <TableCell>{ta.label}</TableCell>
            <TableCell>
              {ta.date
                ? formatter.format(
                    parseDate(`${ta.date}`).toDate(getLocalTimeZone()),
                  )
                : "--"}
            </TableCell>
            <TableCell>${ta.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
