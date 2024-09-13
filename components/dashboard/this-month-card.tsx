import { Card, CardBody } from "@nextui-org/card";

import { heading } from "../primitives";

import { Transaction } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getActualTotal } from "@/utils/helpers";
import { categories } from "@/utils/categories";

export default function ThisMonth({
  category,
  transactions,
  selectedDate,
}: {
  category: string;
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();

  return (
    <Card fullWidth radius="sm">
      <CardBody>
        <div className="h-full flex flex-col justify-evenly">
          <h2 className={heading({ variant: "tertiary" })}>
            {category} this month
          </h2>
          <p className={heading()}>
            {currencyFormatter.format(
              getActualTotal({
                transactions,
                date: selectedDate,
                categories:
                  category === "Income"
                    ? categories.income
                    : category === "Savings"
                      ? categories.savings
                      : categories.expenses.concat(
                          categories.bills,
                          categories.debt,
                        ),
              }),
            )}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
