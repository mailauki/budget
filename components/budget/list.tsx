"use client";

import { Accordion, AccordionItem, type Selection } from "@nextui-org/react";
import moment from "moment";
import React from "react";
import { BsCalendar } from "react-icons/bs";

import DateSelector from "../date-select";
import { title } from "../primitives";

import BudgetSummary from "./summary";
import BudgetsTable from "./table";
import CashFlowSummary from "./cash-flow";

import { categories } from "@/utils/categories";
import { Budget, Transaction } from "@/types";
import NeedsWants from "./50-30-20";

export default function BudgetList({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
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
    <div className="flex flex-col gap-4">
      {categories.income.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
      {categories.bills.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
      {categories.debt.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
      {categories.savings.map((category) => (
        <BudgetsTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
          transactions={transactions}
        />
      ))}
    </div>
  );
}
