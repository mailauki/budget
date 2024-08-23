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
import { categories } from "@/utils/helpers";

export default function BudgetList({ budgets }: { budgets: Budget[] }) {
  return categories.map((category) => (
    <>
      <p>{category.label}</p>
      <Table fullWidth aria-label="Budgets table">
        <TableHeader>
          <TableColumn className="uppercase">Name</TableColumn>
          <TableColumn className="uppercase">Budget</TableColumn>
          <TableColumn className="uppercase">Actual</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display"}>
          {budgets.map((bgt) => (
            <TableRow key={bgt.id}>
              <TableCell>{bgt.label}</TableCell>
              <TableCell>{bgt.budget}</TableCell>
              <TableCell>{bgt.actual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ));
}
