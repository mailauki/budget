"use client";

import {
  Accordion,
  AccordionItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

import BudgetForm from "./form";

import { Budget, Category } from "@/types";

export default function BudgetTable({
  budgets,
  category,
  selectedDate,
}: {
  budgets: Budget[];
  category: Category;
  selectedDate: string;
}) {
  const [budgetSum, setBudgetSum] = React.useState(0);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const sum = budgets.reduce(
      (partialSum, bgt) =>
        partialSum +
        (bgt.date == selectedDate && bgt.category == category.label
          ? bgt.budget
          : 0),
      0,
    );

    setBudgetSum(sum);

    if (sum > 0 && !openKeys.includes(`${category.id}`)) {
      setOpenKeys([...openKeys, `${category.id}`]);
    } else if (sum == 0 && openKeys.includes(`${category.id}`)) {
      setOpenKeys(openKeys.filter((key) => key !== `${category.id}`));
    }
  }, [selectedDate, openKeys]);

  return (
    <>
      <Accordion selectedKeys={openKeys}>
        <AccordionItem
          key={category.id}
          aria-label={category.label}
          title={
            <div className="flex items-center justify-between gap-2">
              <p className="grow flex-1">{category.label}</p>
              <p className="w-[100px] text-right">
                ${new Intl.NumberFormat().format(budgetSum)}
              </p>
              <p className="w-[80px] text-right">$0.00</p>
            </div>
          }
        >
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase">Actual</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell className="grow flex-1">{label.label}</TableCell>
                  <TableCell className="w-[100px] flex-none">
                    <BudgetForm
                      budgets={budgets}
                      category={category.label}
                      label={label.label}
                      selectedDate={selectedDate}
                    />
                  </TableCell>
                  <TableCell className="w-[80px] flex-none">$0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>
    </>
  );
}
