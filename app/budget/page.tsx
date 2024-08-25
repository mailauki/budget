import { Button } from "@nextui-org/button";
import { BsCalendar } from "react-icons/bs";

import { getBudgets, getTransactions } from "../db/queries";

import Budgets from "./budgets";

import { title } from "@/components/primitives";

export default async function BudgetPage() {
  // const { budgets } = await getBudgets();
  // const { transactions } = await getTransactions();
  const budgetsData = getBudgets();
  const transactionsData = getTransactions();

  // Initiate both requests in parallel
  const [{ budgets }, { transactions }] = await Promise.all([
    budgetsData,
    transactionsData,
  ]);

  return (
    <div className="w-full flex flex-col gap-4 my-3">
      <div className="flex items-baseline justify-between">
        <h1 className={title()}>Budget</h1>
        <Button isIconOnly aria-label="Open calendar options" variant="light">
          <BsCalendar />
        </Button>
      </div>
      {/* <BudgetList serverBudgets={budgets} serverTransactions={transactions} /> */}
      <Budgets />
    </div>
  );
}
