"use client";

import {
  Accordion,
  AccordionItem,
  Chip,
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

import BudgetForm from "./budget-form";

import { Budget, Category, Transaction } from "@/types";

export default function BudgetsTable({
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
  const [remaingSum, setRemaingSum] = React.useState(0);
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

    const remaing = sum - actual;

    setRemaingSum(remaing);

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
              <div className="grow flex-1">{category.label}</div>
              <div className="w-[100px] text-right">
                <Chip size="lg" variant="light">
                  $ {new Intl.NumberFormat().format(budgetSum)}
                </Chip>
              </div>
              <div className="w-[80px] text-right hidden sm:block">
                <Chip size="lg" variant="light">
                  $ {new Intl.NumberFormat().format(actualSum)}
                </Chip>
              </div>
              <div className="w-[80px] text-right">
                <Chip
                  color={
                    remaingSum > 0
                      ? "success"
                      : remaingSum < 0
                        ? "danger"
                        : "default"
                  }
                  size="lg"
                  variant="flat"
                >
                  $ {new Intl.NumberFormat().format(remaingSum)}
                </Chip>
              </div>
            </div>
          }
        >
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase hidden sm:table-cell">
                Actual
              </TableColumn>
              <TableColumn className="uppercase">Remaining</TableColumn>
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
                  <TableCell className="w-[80px] hidden sm:table-cell">
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
                  <TableCell className="w-[80px] flex-none">$ 0</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>
    </>
  );
}
