"use client";

import React from "react";

import BudgetsTable from "./table";

import { categories } from "@/utils/categories";
import { Budget, Transaction } from "@/types";

export default function BudgetList({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
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
