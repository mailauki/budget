"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { DonutChart } from "@tremor/react";

import { categories } from "@/utils/categories";
import { getBudgetTotal, getActualTotal } from "@/utils/helpers";
import { useCurrencyFormatter } from "@/utils/formatters";
import { Budget, Transaction } from "@/types";

export default function AllocationSummary({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();

  const incomeData = [
    {
      name: "Rollover",
      budget: 0,
      amount: 0,
      color: "bg-green-500",
    },
    {
      name: "Income",
      budget: getBudgetTotal({
        budgets,
        categories: categories.income,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.income,
        date: selectedDate,
      }),
      color: "bg-green-500",
    },
  ];

  const expensesData = [
    {
      name: "Bills",
      budget: getBudgetTotal({
        budgets,
        categories: categories.bills,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.bills,
        date: selectedDate,
      }),
      color: "bg-cyan-500",
    },
    {
      name: "Savings",
      budget: getBudgetTotal({
        budgets,
        categories: categories.savings,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.savings,
        date: selectedDate,
      }),
      color: "bg-indigo-500",
    },
    {
      name: "Debt",
      budget: getBudgetTotal({
        budgets,
        categories: categories.debt,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.debt,
        date: selectedDate,
      }),
      color: "bg-violet-500",
    },
    {
      name: "Expenses",
      budget: getBudgetTotal({
        budgets,
        categories: categories.expenses,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.expenses,
        date: selectedDate,
      }),
      color: "bg-fuchsia-500",
    },
  ];

  return (
    <Card radius="sm">
      <CardHeader>
        <p>Allocation Summary</p>
      </CardHeader>
      <CardBody>
        <DonutChart
          category="amount"
          colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
          data={expensesData}
          index="name"
          showTooltip={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        />
      </CardBody>
      <CardFooter>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn key="name" isRowHeader className="uppercase">
              Name
            </TableColumn>
            <TableColumn key="budget" align="end" className="uppercase">
              Budget
            </TableColumn>
            <TableColumn key="amount" align="end" className="uppercase">
              Actual
            </TableColumn>
          </TableHeader>
          <TableBody items={incomeData.concat(expensesData)}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "name" ? (
                      <Chip
                        className="border-none gap-1"
                        classNames={{ dot: item.color }}
                        variant="dot"
                      >
                        {getKeyValue(item, columnKey)}
                      </Chip>
                    ) : (
                      currencyFormatter.format(getKeyValue(item, columnKey))
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
}
