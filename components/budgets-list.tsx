/* eslint-disable no-console */
"use client";

import type { Selection } from "@nextui-org/react";

import moment from "moment";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { BsCalendar } from "react-icons/bs";

import BudgetsTable from "./budgets-table";
import DateSelector from "./date-select";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/helpers";
import { title } from "./primitives";

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
    <>
      <Accordion
        aria-label="Open calendar options"
        selectedKeys={calendarOpen}
        onSelectionChange={setCalendarOpen}
      >
        <AccordionItem
          key="calendar"
          disableIndicatorAnimation
          indicator={<BsCalendar />}
          title={<h1 className={title()}>Budget</h1>}
        >
          <DateSelector changeDate={changeDate} selectedDate={selectedDate} />
        </AccordionItem>
      </Accordion>
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
