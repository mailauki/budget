import { Card, CardFooter, CardHeader, Chip, Divider } from "@nextui-org/react";

import { title } from "../primitives";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function LeftToSpend({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();

  return (
    <Card radius="sm">
      <CardHeader className="flex-col justify-center text-center py-[3.15rem] gap-1">
        <p className="text-default-500">Left to spend</p>
        <p className={title()}>
          {currencyFormatter.format(
            getActualTotal({
              transactions,
              categories: categories.income.map((labels) => labels),
              date: selectedDate,
            }) -
              getActualTotal({
                transactions,
                categories: categories.expenses.concat(
                  categories.bills,
                  categories.debt,
                  categories.savings,
                ),
                date: selectedDate,
              }),
          )}
        </p>
      </CardHeader>
      <Divider />
      <CardFooter className="h-14 text-small items-center justify-between space-x-4">
        <p className="text-default-500">Left to budget</p>
        <Divider orientation="vertical" />
        <Chip size="lg" variant="light">
          {currencyFormatter.format(
            getBudgetTotal({
              budgets,
              categories: categories.income,
              date: selectedDate,
            }) -
              getBudgetTotal({
                budgets,
                categories: categories.expenses.concat(
                  categories.bills,
                  categories.debt,
                  categories.savings,
                ),
                date: selectedDate,
              }),
          )}
        </Chip>
      </CardFooter>
    </Card>
  );
}
