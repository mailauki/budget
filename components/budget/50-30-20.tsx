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
import React from "react";
import { DonutChart } from "@tremor/react";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getBudgetTotal, getActualTotal } from "@/utils/helpers";

export default function NeedsWants({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  function budgetPercent(number: number) {
    const income = getBudgetTotal({
      budgets,
      categories: categories.income,
      date: selectedDate,
    });

    return Math.ceil((100 * number) / income);
  }
  function actualPercent(number: number) {
    const income = getActualTotal({
      transactions,
      categories: categories.income,
      date: selectedDate,
    });

    return Math.ceil((100 * number) / income);
  }

  const data = [
    {
      name: "Needs",
      expected: 50,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.bills,
          date: selectedDate,
        }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.bills,
          date: selectedDate,
        }),
      ),
      color: "bg-cyan-500",
    },
    {
      name: "Wants",
      expected: 30,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.expenses,
          date: selectedDate,
        }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.expenses,
          date: selectedDate,
        }),
      ),
      color: "bg-blue-500",
    },
    {
      name: "Savings & Debt",
      expected: 20,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.savings,
          date: selectedDate,
        }) +
          getBudgetTotal({
            budgets,
            categories: categories.debt,
            date: selectedDate,
          }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.savings,
          date: selectedDate,
        }) +
          getActualTotal({
            transactions,
            categories: categories.debt,
            date: selectedDate,
          }),
      ),
      color: "bg-indigo-500",
    },
  ];

  return (
    <Card radius="sm">
      <CardHeader>
        <p>50/30/20</p>
      </CardHeader>
      <CardBody>
        <DonutChart
          aria-label="50-30-20 chart"
          category="actual"
          colors={["cyan", "blue", "indigo"]}
          data={data}
          index="name"
          showLabel={false}
          showTooltip={false}
        />
      </CardBody>
      <CardFooter>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="expected" align="center">
              Expected
            </TableColumn>
            <TableColumn key="budget" align="center">
              Budget
            </TableColumn>
            <TableColumn key="actual" align="center">
              Actual
            </TableColumn>
          </TableHeader>
          <TableBody items={data}>
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
                      <>{getKeyValue(item, columnKey) || 0}%</>
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
