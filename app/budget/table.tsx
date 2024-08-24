"use client";

import {
  Accordion,
  AccordionItem,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { isSameMonth, parseDate } from "@internationalized/date";

import BudgetForm from "./form";

import { Budget, Category, Transaction } from "@/types";

export default function BudgetTable({
  budgets,
  category,
  selectedDate,
  transactions,
}: {
  budgets: Budget[];
  category: Category;
  selectedDate: string;
  transactions: Transaction[];
}) {
  const [budgetSum, setBudgetSum] = React.useState(0);
  const [actualSum, setActualSum] = React.useState(0);
  const [openKeys, setOpenKeys] = React.useState(new Set([""]));

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

    const actual = transactions.reduce(
      (partialSum, ta) =>
        partialSum +
        (isSameMonth(
          parseDate(`${ta.date}`),
          parseDate(`${selectedDate}-01`),
        ) && category.labels.some(({ label }) => label == ta.category)
          ? ta.amount
          : 0),
      0,
    );

    setActualSum(actual);

    if (sum > 0) setOpenKeys(new Set([`${category.id}`]));
    else if (sum == 0) setOpenKeys(new Set([""]));
  }, [selectedDate]);

  return (
    <>
      <Accordion
        defaultSelectedKeys={openKeys}
        selectedKeys={openKeys}
        onSelectionChange={setOpenKeys as (keys: Selection) => void}
      >
        <AccordionItem
          key={category.id}
          aria-label={category.label}
          title={
            <div className="flex items-center justify-between gap-2">
              <p className="grow flex-1">{category.label}</p>
              <p className="w-[100px] text-right">
                $ {new Intl.NumberFormat().format(budgetSum)}
              </p>
              <p className="w-[80px] text-right">
                $ {new Intl.NumberFormat().format(actualSum)}
              </p>
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
                  <TableCell className="w-[80px] flex-none">
                    ${" "}
                    {new Intl.NumberFormat().format(
                      transactions?.reduce(
                        (partialSum, ta) =>
                          partialSum +
                          (isSameMonth(
                            parseDate(`${ta.date}`),
                            parseDate(`${selectedDate}-01`),
                          ) && label.label == ta.category
                            ? ta.amount
                            : 0),
                        0,
                      ),
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>
    </>
  );
}
