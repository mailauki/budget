"use client";

import React from "react";
import { DonutChart } from "@tremor/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getCategoryColor } from "@/utils/helpers";
import {
  Chip,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ExpenseSummary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const currencyFormatter = useCurrencyFormatter();
  const [showComparison, setShowComparison] = React.useState(false);

  // const expensesData = [
  //   {
  //     name: "Bills",
  //     actual: getActualTotal({
  //       transactions,
  //       categories: categories.bills,
  //       date: selectedDate,
  //     }),
  //   },
  //   {
  //     name: "Savings",
  //     actual: getActualTotal({
  //       transactions,
  //       categories: categories.savings,
  //       date: selectedDate,
  //     }),
  //   },
  //   {
  //     name: "Debt",
  //     actual: getActualTotal({
  //       transactions,
  //       categories: categories.debt,
  //       date: selectedDate,
  //     }),
  //   },
  //   {
  //     name: "Expenses",
  //     actual: getActualTotal({
  //       transactions,
  //       categories: categories.expenses,
  //       date: selectedDate,
  //     }),
  //   },
  // ];

  const data = categories.expenses.flatMap((category) =>
    category.labels.flatMap((label) =>
      Object.assign({
        name: label.name,
        amount: transactions
          .filter((ta) => ta.category_label == label.name)
          .reduce((partialSum, item) => partialSum + item.amount, 0),
        // category: transactions.find((ta) => ta.category === category.name)
        //   ?.category!,
        category: category.name,
        color: getCategoryColor(category.name),
      }),
    ),
  );

  return (
    <Card radius="sm">
      <CardHeader>
        <p>Expense summary</p>
      </CardHeader>
      <CardBody className="px-6">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <DonutChart
          category="amount"
          // colors={[
          //   "green",
          //   "cyan",
          //   "blue",
          //   "indigo",
          //   "violet",
          //   "purple",
          //   "pink",
          //   "red",
          //   "orange",
          //   "yellow",
          //   "neutral",
          // ]}
          colors={data.flatMap((item) => item.color)}
          data={data}
          index="name"
          // showLabel={false}
          // showTooltip={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        />
      </CardBody>
      <CardFooter>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn key="name" isRowHeader className="uppercase">
              Name
            </TableColumn>
            <TableColumn key="category" align="center" className="uppercase">
              Category
            </TableColumn>
            <TableColumn key="amount" align="end" className="uppercase">
              Actual
            </TableColumn>
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow
                key={item.name}
                className={`${item.amount === 0 && "hidden"}`}
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "name" ? (
                      <Chip
                        className="border-none gap-1"
                        classNames={{ dot: `bg-${item.color}-500` }}
                        variant="dot"
                      >
                        {getKeyValue(item, columnKey)}
                      </Chip>
                    ) : columnKey === "amount" ? (
                      currencyFormatter.format(getKeyValue(item, columnKey))
                    ) : (
                      getKeyValue(item, columnKey)
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
