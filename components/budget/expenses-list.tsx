"use client";

import React from "react";

import BudgetsTable from "./table";

import { categories } from "@/utils/categories";
import { Budget, Transaction } from "@/types";

export default function BudgetExpenses({
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
  );
}
