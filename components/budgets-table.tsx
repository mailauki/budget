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
import { useNumberFormatter } from "@react-aria/i18n";

import BudgetForm from "./budget-form";

import { Budget, Categories, Transaction } from "@/types";

export default function BudgetsTable({
  budgets,
  category,
  selectedDate,
  transactions,
}: {
  budgets: Budget[];
  category: Categories;
  selectedDate: string;
  transactions: Transaction[];
}) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
  });
  const [budgetSum, setBudgetSum] = React.useState(0);
  const [actualSum, setActualSum] = React.useState(0);
  const [remaingSum, setRemaingSum] = React.useState(0);
  const [openKeys, setOpenKeys] = React.useState(new Set([""]));

  React.useEffect(() => {
    const sum = budgets.reduce(
      (partialSum, bgt) =>
        partialSum +
        (bgt.date == selectedDate && bgt.category == category.name
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
        ) && category.labels.some(({ name }) => name == ta.category)
          ? ta.amount
          : 0),
      0,
    );

    setActualSum(actual);

    const remaing = sum - actual;

    setRemaingSum(remaing);

    if (sum > 0) setOpenKeys(new Set([`${category.id}`]));
    else if (sum == 0) setOpenKeys(new Set([""]));
  }, [selectedDate, budgets, transactions]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="grow flex-1">{category.name}</div>
        <div className="w-[100px] text-right">
          <Chip size="lg" variant="light">
            {formatter.format(budgetSum)}
          </Chip>
        </div>
        <div className="w-[100px] text-right hidden sm:block">
          <Chip size="lg" variant="light">
            {formatter.format(actualSum)}
          </Chip>
        </div>
        <div className="w-[100px] text-right">
          <Chip
            color={
              remaingSum > 0 ? "success" : remaingSum < 0 ? "danger" : "default"
            }
            size="lg"
            variant="flat"
          >
            {formatter.format(remaingSum)}
          </Chip>
        </div>
      </div>
    );
  }, [category, budgetSum, actualSum, remaingSum]);

  return (
    <>
      <Accordion
        defaultSelectedKeys={openKeys}
        selectedKeys={openKeys}
        onSelectionChange={setOpenKeys as (keys: Selection) => void}
      >
        <AccordionItem
          key={category.id}
          aria-label={category.name}
          title={topContent}
        >
          <Table fullWidth aria-label="Budgets table" radius="sm">
            <TableHeader>
              <TableColumn align="start" className="uppercase">
                Name
              </TableColumn>
              <TableColumn align="center" className="uppercase">
                Budget
              </TableColumn>
              <TableColumn
                align="end"
                className="uppercase hidden sm:table-cell"
              >
                Actual
              </TableColumn>
              <TableColumn align="end" className="uppercase">
                Remaining
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell className="grow flex-1">{label.name}</TableCell>
                  <TableCell className="w-[100px] flex-none">
                    <BudgetForm
                      budgets={budgets}
                      category={category.name}
                      name={label.name}
                      selectedDate={selectedDate}
                    />
                  </TableCell>
                  <TableCell className="w-[100px] hidden sm:table-cell">
                    {formatter.format(
                      transactions?.reduce(
                        (partialSum, ta) =>
                          partialSum +
                          (isSameMonth(
                            parseDate(`${ta.date}`),
                            parseDate(`${selectedDate}-01`),
                          ) && label.name == ta.category
                            ? ta.amount
                            : 0),
                        0,
                      ),
                    )}
                  </TableCell>
                  <TableCell className="w-[100px] flex-none">
                    {formatter.format(0)}
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
