"use client";

import { Accordion, AccordionItem, type Selection } from "@nextui-org/react";
import moment from "moment";
import React from "react";
import { BsCalendar } from "react-icons/bs";

import BudgetsTable from "./budgets-table";
import BudgetSummary from "./budget-summary";
import DateSelector from "./date-select";
import { title } from "./primitives";

import { categories } from "@/utils/categories";
import { Budget, Transaction } from "@/types";

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
      <section className="md:col-span-12">
        <Accordion
          aria-label="Open calendar options"
          className="px-0"
          selectedKeys={calendarOpen}
          onSelectionChange={setCalendarOpen}
        >
          <AccordionItem
            key="calendar"
            disableIndicatorAnimation
            classNames={{ base: "px-0", trigger: "items-baseline" }}
            indicator={<BsCalendar />}
            title={<h1 className={title()}>Budget</h1>}
          >
            <DateSelector changeDate={changeDate} selectedDate={selectedDate} />
          </AccordionItem>
        </Accordion>
      </section>
      <aside className="md:col-span-5 md:order-last">
        <div className="w-full flex flex-col gap-4">
          <BudgetSummary
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </aside>
      <section className="md:col-span-7">
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
          {categories.expenses.map((category) => (
            <BudgetsTable
              key={category.id}
              budgets={budgets}
              category={category}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          ))}
        </div>
      </section>
    </>
  );
}
