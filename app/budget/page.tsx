import moment from "moment";

import { getBudgets } from "../db/queries";

import BudgetList from "./list";
import DateSelector from "./date-select";

import { title } from "@/components/primitives";

export default async function BudgetPage() {
  const { budgets } = await getBudgets();

  return (
    <div className="w-full flex flex-col gap-2 my-3">
      <h1 className={title()}>Budget</h1>
      <DateSelector />
      <BudgetList budgets={budgets} date={`${moment().format("YYYY-MM")}-01`} />
    </div>
  );
}
