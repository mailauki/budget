"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { parseDate, isSameMonth } from "@internationalized/date";
import moment from "moment";
import { BarChart } from "@tremor/react";

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
  const expense_categories = categories.expenses.flatMap((category) =>
    Object.assign({
      name: category.name,
      color: getCategoryColor(category.name),
    }),
  );

  function createObject(keys: string[], values: number[]) {
    const obj = Object.fromEntries(
      keys.map((key, index) => [key, values[index]]),
    );

    return obj;
  }
  const data_exp = months.map((month) =>
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

  return (
    <>
      {/* <pre>{JSON.stringify(data_exp, null, 2)}</pre> */}
      <Card>
        <CardHeader>Expense summary</CardHeader>
        <CardBody>
          <BarChart
            stack
            aria-label="Expense chart"
            categories={expense_categories.flatMap((category) => category.name)}
            colors={expense_categories.flatMap((category) => category.color)}
            data={data_exp}
            index="date"
            showGridLines={false}
            showLegend={false}
            // showTooltip={false}
            // enableLegendSlider
            showYAxis={false}
            valueFormatter={(amount) => currencyFormatter.format(amount)}
          />
        </CardBody>
        <CardFooter />
      </Card>
    </>
  );
}
