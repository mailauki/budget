"use client";

import React from "react";
import { BarChart } from "@tremor/react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Switch,
} from "@nextui-org/react";

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
  const [showComparison, setShowComparison] = React.useState(false);

  const expensesData = [
    {
      name: "Bills",
      budget: getBudgetTotal({
        budgets,
        categories: categories.bills,
        date: selectedDate,
      }),
      actual: getActualTotal({
        transactions,
        categories: categories.bills,
        date: selectedDate,
      }),
    },
    {
      name: "Savings",
      budget: getBudgetTotal({
        budgets,
        categories: categories.savings,
        date: selectedDate,
      }),
      actual: getActualTotal({
        transactions,
        categories: categories.savings,
        date: selectedDate,
      }),
    },
    {
      name: "Debt",
      budget: getBudgetTotal({
        budgets,
        categories: categories.debt,
        date: selectedDate,
      }),
      actual: getActualTotal({
        transactions,
        categories: categories.debt,
        date: selectedDate,
      }),
    },
    {
      name: "Expenses",
      budget: getBudgetTotal({
        budgets,
        categories: categories.expenses,
        date: selectedDate,
      }),
      actual: getActualTotal({
        transactions,
        categories: categories.expenses,
        date: selectedDate,
      }),
    },
  ];

  return (
    <Card radius="sm">
      <CardHeader>
        <p>Cash flow summary</p>
      </CardHeader>
      <CardBody className="px-6">
        <BarChart
          aria-label="Cash flow chart"
          categories={showComparison ? ["budget", "actual"] : ["actual"]}
          className="mt-6 hidden h-60 sm:block"
          colors={showComparison ? ["cyan", "blue"] : ["blue"]}
          data={expensesData}
          index="name"
          valueFormatter={(amount) => currencyFormatter.format(amount)}
          yAxisWidth={50}
        />
        <BarChart
          aria-label="Cash flow chart with budget comparison"
          categories={showComparison ? ["budget", "actual"] : ["actual"]}
          className="mt-4 h-56 sm:hidden"
          colors={showComparison ? ["cyan", "blue"] : ["blue"]}
          data={expensesData}
          index="name"
          showYAxis={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        />
      </CardBody>
      <CardFooter>
        {/* <div className="mb-2 flex items-center space-x-3">
          <Switch
            id="comparison"
            onChange={() => setShowComparison(!showComparison)}
          />
          <label
            className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            htmlFor="comparison"
          >
            Show budget
          </label>
        </div> */}
        <Switch onChange={() => setShowComparison(!showComparison)}>
          Show budget
        </Switch>
      </CardFooter>
    </Card>
  );
}
