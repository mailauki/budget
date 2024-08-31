/* eslint-disable no-console */
"use client";

import type { Selection } from "@nextui-org/react";

import moment from "moment";
import React from "react";
import {
  Accordion,
  AccordionItem,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { BsCalendar } from "react-icons/bs";
import { useNumberFormatter } from "@react-aria/i18n";

import BudgetsTable from "./budgets-table";
import DateSelector from "./date-select";
import { title } from "./primitives";

import { Budget, Transaction } from "@/types";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";
import { categories } from "@/utils/categories";

export default function BudgetList({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    // trailingZeroDisplay: "stripIfInteger",
    // roundingPriority: "auto",
  });
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
  );
  const [calendarOpen, setCalendarOpen] = React.useState<Selection>(
    new Set([]),
  );

  function changeDate(date: React.SetStateAction<string>) {
    setSelectedDate(date);
  }

  React.useEffect(() => {
    let element = document.getElementById(selectedDate);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [selectedDate, calendarOpen]);

  return (
    <>
      <Accordion
        aria-label="Open calendar options"
        // classNames={{ base: "px-0" }}
        className="px-0"
        // variant="splitted"
        selectedKeys={calendarOpen}
        onSelectionChange={setCalendarOpen}
      >
        <AccordionItem
          key="calendar"
          disableIndicatorAnimation
          classNames={{ base: "px-0" }}
          indicator={<BsCalendar />}
          title={<h1 className={title()}>Budget</h1>}
        >
          <DateSelector changeDate={changeDate} selectedDate={selectedDate} />
        </AccordionItem>
      </Accordion>
      <Card>
        <CardHeader className="flex-col justify-center text-center py-12 gap-1">
          <p className="text-default-500">Left to spend</p>
          <p className={title()}>
            {formatter.format(
              getActualTotal(transactions, {
                categories: categories.income,
                date: selectedDate,
              }) -
                getActualTotal(transactions, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
            )}
          </p>
        </CardHeader>
        <Divider />
        <CardFooter className="h-14 text-small items-center justify-between space-x-4">
          <p className="text-default-500">Left to budget</p>
          <Divider orientation="vertical" />
          <Chip size="lg" variant="light">
            {formatter.format(
              getBudgetTotal(budgets, {
                categories: categories.income,
                date: selectedDate,
              }) -
                getBudgetTotal(budgets, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
            )}
          </Chip>
        </CardFooter>
      </Card>
      <Table>
        <TableHeader>
          <TableColumn className="uppercase">Name</TableColumn>
          <TableColumn align="end" className="uppercase">
            Budget
          </TableColumn>
          <TableColumn align="end" className="uppercase">
            Actual
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Rollover</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Income</TableCell>
            <TableCell>
              {formatter.format(
                getBudgetTotal(budgets, {
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {formatter.format(
                getActualTotal(transactions, {
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bills</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Savings</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Debt</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Expenses</TableCell>
            <TableCell>
              {formatter.format(
                getBudgetTotal(budgets, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {formatter.format(
                getActualTotal(transactions, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {categories.income.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
      {categories.expenses.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
    </>
  );
}
