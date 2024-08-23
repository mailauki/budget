"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Budget } from "@/types";

export default function BudgetList({ budgets }: { budgets: Budget[] }) {
  return (
    <Table fullWidth aria-label="Budgets table">
      <TableHeader>
        <TableColumn className="uppercase">Name</TableColumn>
        <TableColumn className="uppercase">Budget</TableColumn>
        <TableColumn className="uppercase">Actual</TableColumn>
      </TableHeader>
      {budgets.length == 0 ? (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      ) : (
        <TableBody>
          {budgets.map((bgt) => (
            <TableRow key={bgt.id}>
              <TableCell>{bgt.label}</TableCell>
              <TableCell>{bgt.budget}</TableCell>
              <TableCell>{bgt.actual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
