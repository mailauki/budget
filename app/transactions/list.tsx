"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Transaction } from "@/types";

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
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
            <TableCell>{ta.date}</TableCell>
            <TableCell>{ta.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
