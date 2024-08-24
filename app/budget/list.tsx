/* eslint-disable no-console */
"use client";

import moment from "moment";
import React from "react";

import DateSelector from "./date-select";
import BudgetTable from "./table";

import { Budget } from "@/types";
import { categories } from "@/utils/helpers";

export default function BudgetList({ budgets }: { budgets: Budget[] }) {
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
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
  }, [selectedDate]);

  return (
    <>
      <DateSelector changeDate={changeDate} selectedDate={selectedDate} />
      {categories.income.map((category) => (
        <BudgetTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
        />
      ))}
      {categories.expenses.map((category) => (
        <BudgetTable
          key={category.id}
          budgets={budgets}
          category={category}
          selectedDate={selectedDate}
        />
      ))}
    </>
  );
}
