"use client";

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Budget } from "@/types";
import { categories } from "@/utils/helpers";

export default function BudgetList({
  budgets,
}: {
  budgets: Budget[] | undefined;
}) {
  return (
    <>
      {categories.income.map((category) => (
        <>
          <p>{category.label}</p>
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase">Actual</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell>{label.label}</TableCell>
                  <TableCell>
                    <Input
                      className="w-[90px]"
                      defaultValue={`$${
                        budgets?.find((bgt) => {
                          if (bgt.label == label.label)
                            return bgt.budget.toFixed(2);
                        }) || (0).toFixed(2)
                      }`}
                      variant="bordered"
                    />
                  </TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}
      {categories.expenses.map((category) => (
        <>
          <p>{category.label}</p>
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase">Actual</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell>{label.label}</TableCell>
                  <TableCell>
                    <Input
                      className="w-[90px]"
                      defaultValue={`$${
                        budgets?.find((bgt) => {
                          if (bgt.label == label.label)
                            return bgt.budget.toFixed(2);
                        }) || (0).toFixed(2)
                      }`}
                      variant="bordered"
                    />
                  </TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}
    </>
  );
}
