"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { parseDate, isSameMonth } from "@internationalized/date";
import moment from "moment";
import { BarChart } from "@tremor/react";
import { Chip } from "@nextui-org/react";

import { useCurrencyFormatter } from "@/utils/formatters";
import { categories } from "@/utils/categories";
import { getCategoryColor } from "@/utils/colors";
import { Transaction } from "@/types";
import { getDatesBetween } from "@/utils/helpers";

export default function ExpenseChart({
  transactions,
  selectedDate,
}: {
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();
  const year = parseDate(`${selectedDate}-01`).year;
  const months = getDatesBetween(`${year}-01-01`, `${year}-12-01`);

  function createObject(keys: string[], values: number[]) {
    const obj = Object.fromEntries(
      keys.map((key, index) => [key, values[index]]),
    );

    return obj;
  }
  const data_expenses = months.map((month) =>
    Object.assign(
      createObject(
        categories.expenses.flatMap((category) => category.name),
        categories.expenses.flatMap((category) =>
          transactions
            .filter((ta) => isSameMonth(parseDate(ta.date), parseDate(month)))
            .filter((ta) => ta.category == category.name)
            .reduce((partialSum, item) => partialSum + item.amount, 0),
        ),
      ),
      { date: moment(month).format("MMM YY") },
    ),
  );

  const data_category = categories.expenses.flatMap((category) =>
    Object.assign({
      name: category.name,
      amount: transactions
        .filter((ta) =>
          isSameMonth(parseDate(ta.date), parseDate(`${selectedDate}-01`)),
        )
        .filter((ta) => ta.category == category.name)
        .reduce((partialSum, item) => partialSum + item.amount, 0),
      color: getCategoryColor(category.name),
    }),
  );

  return (
    <Card>
      <CardHeader>Expense summary</CardHeader>
      <CardBody>
        <BarChart
          stack
          aria-label="Expense chart"
          categories={data_category.flatMap((category) => category.name)}
          className="h-60"
          colors={data_category.flatMap((category) => category.color)}
          data={data_expenses}
          index="date"
          showLegend={false}
          showTooltip={false}
          showYAxis={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        />
      </CardBody>
      <CardFooter>
        <div className="w-full flex flex-col px-2">
          {data_category.map(
            (item) =>
              item.amount > 0 && (
                <div key={item.name} className="flex justify-between">
                  <Chip
                    className="border-none gap-1"
                    classNames={{
                      dot: `bg-${item.color}-500`,
                    }}
                    variant="dot"
                  >
                    {item.name}
                  </Chip>
                  <p>{currencyFormatter.format(item.amount)}</p>
                </div>
              ),
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
