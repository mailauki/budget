import React from "react";

import { getBudgets } from "../db/queries";

import BudgetList from "./list";

import { title } from "@/components/primitives";

export default async function BudgetPage() {
  const { budgets } = await getBudgets();

  return (
    <div className="w-full flex flex-col gap-4 my-3">
      <h1 className={title()}>Budget</h1>
      <BudgetList budgets={budgets} />
    </div>
  );
}
