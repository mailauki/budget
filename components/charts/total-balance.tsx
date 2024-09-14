import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { AreaChart } from "@tremor/react";
import moment from "moment";

import { heading } from "../primitives";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getActualTotal } from "@/utils/helpers";
import { getDatesBetween } from "@/utils/helpers";

export default function TotalBalanceChart({
  transactions,
  selectedDate,
}: {
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();
  let startDate = `${moment().format("YYYY")}-01-01`;
  let endDate = `${moment().format("YYYY")}-12-01`;

  let dateRange = getDatesBetween(startDate, endDate);

  const data = dateRange.map((date: string) =>
    Object.assign({
      date: moment(date).format("YYYY-MM"),
      name: moment(date).format("MMM"),
      Spent: getActualTotal({
        transactions,
        categories: categories.bills.concat(
          categories.debt,
          categories.expenses,
          categories.savings,
        ),
        date: moment(date).format("YYYY-MM"),
      }),
      Income: getActualTotal({
        transactions,
        categories: categories.income,
        date: moment(date).format("YYYY-MM"),
      }),
    }),
  );

  return (
    <Card className="py-4" radius="sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex flex-col">
          <h2 className={heading({ variant: "subtitle" })}>Total balance</h2>
          <p className={heading({ variant: "title" })}>
            {currencyFormatter.format(
              getActualTotal({
                transactions,
                categories: categories.bills.concat(
                  categories.debt,
                  categories.expenses,
                  categories.savings,
                ),
                date: selectedDate,
              }),
            )}
          </p>
        </div>
      </CardHeader>
      <CardBody className="px-6 overflow-hidden">
        <AreaChart
          aria-label="Total balance chart"
          categories={["Spent", "Income"]}
          className="my-6 h-60"
          colors={["blue", "violet"]}
          data={data}
          index="name"
          showGradient={false}
          showLegend={false}
          showYAxis={false}
          valueFormatter={(amount) => currencyFormatter.format(amount)}
        />
      </CardBody>
    </Card>
  );
}
