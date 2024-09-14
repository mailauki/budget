"use client";

import React from "react";
import { BarChart } from "@tremor/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function CashFlowSummary({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();
  // const [showComparison, setShowComparison] = React.useState(false);

  const expensesData = [
    {
      name: "Bills",
      Budget: getBudgetTotal({
        budgets,
        categories: categories.bills,
        date: selectedDate,
      }),
      Actual: getActualTotal({
        transactions,
        categories: categories.bills,
        date: selectedDate,
      }),
    },
    {
      name: "Savings",
      Budget: getBudgetTotal({
        budgets,
        categories: categories.savings,
        date: selectedDate,
      }),
      Actual: getActualTotal({
        transactions,
        categories: categories.savings,
        date: selectedDate,
      }),
    },
    {
      name: "Debt",
      Budget: getBudgetTotal({
        budgets,
        categories: categories.debt,
        date: selectedDate,
      }),
      Actual: getActualTotal({
        transactions,
        categories: categories.debt,
        date: selectedDate,
      }),
    },
    {
      name: "Expenses",
      Budget: getBudgetTotal({
        budgets,
        categories: categories.expenses,
        date: selectedDate,
      }),
      Actual: getActualTotal({
        transactions,
        categories: categories.expenses,
        date: selectedDate,
      }),
    },
  ];

  return (
    <Card radius="sm">
      <CardHeader>Cash flow summary</CardHeader>
      <CardBody className="px-6">
        <BarChart
          aria-label="Cash flow chart"
          categories={["Budget", "Actual"]}
          colors={["cyan", "blue"]}
          data={expensesData}
          index="name"
          layout="vertical"
          showGridLines={false}
          showXAxis={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
          yAxisWidth={60}
        />
        {/* <BarChart
          aria-label="Cash flow chart"
          categories={showComparison ? ["Budget", "Actual"] : ["Actual"]}
          className="mt-6 hidden h-60 sm:block"
          colors={showComparison ? ["cyan", "blue"] : ["blue"]}
          data={expensesData}
          index="name"
          layout="vertical"
          valueFormatter={(amount) => currencyFormatter.format(amount)}
          yAxisWidth={50}
        />
        <BarChart
          aria-label="Cash flow chart with budget comparison"
          categories={showComparison ? ["Budget", "Actual"] : ["Actual"]}
          className="mt-4 h-56 sm:hidden"
          colors={showComparison ? ["cyan", "blue"] : ["blue"]}
          data={expensesData}
          index="name"
          layout="vertical"
          showYAxis={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        /> */}
      </CardBody>
      <CardFooter>
        {/* <Switch size="sm" onChange={() => setShowComparison(!showComparison)}>
          {showComparison ? "Hide" : "Show"} budget
        </Switch> */}
      </CardFooter>
    </Card>
  );
}
