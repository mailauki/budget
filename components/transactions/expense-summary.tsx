"use client";

import React, { Suspense } from "react";
import { DonutChart } from "@tremor/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Chip,
  getKeyValue,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getCategoryColor, getLabelColor } from "@/utils/helpers";

export default function ExpenseSummary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const currencyFormatter = useCurrencyFormatter();
  const [showComparison, setShowComparison] = React.useState(true);

  const data_label = categories.bills
    .concat(categories.debt, categories.savings, categories.expenses)
    .flatMap((category) =>
      category.labels.flatMap((label) =>
        Object.assign({
          name: label.name,
          amount: transactions
            .filter((ta) => ta.category_label == label.name)
            .reduce((partialSum, item) => partialSum + item.amount, 0),
          percent: Math.ceil(
            (100 *
              transactions
                .filter((ta) => ta.category_label == label.name)
                .reduce((partialSum, item) => partialSum + item.amount, 0)) /
              transactions
                .filter((ta) => ta.category == "Income")
                .reduce((partialSum, item) => partialSum + item.amount, 0),
          ),
          category: category.name,
          color: getLabelColor(label.name),
          category_color: getCategoryColor(category.name),
        }),
      ),
    );
  const data_category = categories.bills
    .concat(categories.debt, categories.savings, categories.expenses)
    .flatMap((category) =>
      Object.assign({
        name: category.name,
        amount: transactions
          .filter((ta) => ta.category == category.name)
          .reduce((partialSum, item) => partialSum + item.amount, 0),
        percent: Math.ceil(
          (100 *
            transactions
              .filter((ta) => ta.category == category.name)
              .reduce((partialSum, item) => partialSum + item.amount, 0)) /
            transactions
              .filter((ta) => ta.category == "Income")
              .reduce((partialSum, item) => partialSum + item.amount, 0),
        ),
        color: getCategoryColor(category.name),
      }),
    );

  return (
    <Card className="hidden sm:flex" radius="sm">
      <CardHeader className="items-start justify-between">
        <p>Expense summary</p>
        <Switch onChange={() => setShowComparison(!showComparison)} />
      </CardHeader>
      <CardBody className="px-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Skeleton className="rounded-full w-[164px] h-[164px]" />
            </div>
          }
        >
          {showComparison ? (
            <DonutChart
              aria-label="Expense summary chart"
              category="amount"
              colors={data_label.flatMap((item) => item.color)}
              data={data_label}
              index="name"
              valueFormatter={(amount) => currencyFormatter.format(amount)}
            />
          ) : (
            <DonutChart
              aria-label="Expense summary chart"
              category="amount"
              colors={data_category.flatMap((item) => item.color)}
              data={data_category}
              index="name"
              valueFormatter={(amount) => currencyFormatter.format(amount)}
            />
          )}
        </Suspense>
      </CardBody>
      <CardFooter>
        {showComparison ? (
          <Table removeWrapper aria-label="Expenses table">
            <TableHeader>
              <TableColumn key="name" isRowHeader className="uppercase">
                Category
              </TableColumn>
              {/* <TableColumn key="category" isRowHeader className="uppercase">
                Category
              </TableColumn> */}
              <TableColumn key="percent" align="center" className="uppercase">
                Percent
              </TableColumn>
              <TableColumn key="amount" align="end" className="uppercase">
                Amount
              </TableColumn>
            </TableHeader>
            <TableBody items={data_label}>
              {(item) => (
                <TableRow
                  key={item.name}
                  className={`${item.amount === 0 && "hidden"}`}
                >
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "amount" ? (
                        currencyFormatter.format(getKeyValue(item, columnKey))
                      ) : columnKey === "name" ? (
                        <Chip
                          className="border-none gap-1"
                          classNames={{
                            dot: `bg-${item.color}-500`,
                          }}
                          variant="dot"
                        >
                          {getKeyValue(item, columnKey)}
                        </Chip>
                      ) : (
                        <>{getKeyValue(item, columnKey)}%</>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Table removeWrapper aria-label="Expenses table">
            <TableHeader>
              <TableColumn key="name" isRowHeader className="uppercase">
                Category
              </TableColumn>
              <TableColumn key="percent" align="center" className="uppercase">
                Percent
              </TableColumn>
              <TableColumn key="amount" align="end" className="uppercase">
                Amount
              </TableColumn>
            </TableHeader>
            <TableBody items={data_category}>
              {(item) => (
                <TableRow
                  key={item.name}
                  className={`${item.amount === 0 && "hidden"}`}
                >
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "amount" ? (
                        currencyFormatter.format(getKeyValue(item, columnKey))
                      ) : columnKey === "name" ? (
                        <Chip
                          className="border-none gap-1"
                          classNames={{
                            dot: `bg-${item.color}-500`,
                          }}
                          variant="dot"
                        >
                          {getKeyValue(item, columnKey)}
                        </Chip>
                      ) : (
                        <>{getKeyValue(item, columnKey)}%</>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardFooter>
    </Card>
  );
}
