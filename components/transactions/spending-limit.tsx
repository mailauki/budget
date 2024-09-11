"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Progress,
} from "@nextui-org/react";
import { BsExclamationCircle } from "react-icons/bs";

import { heading } from "../primitives";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";

export default function SpendingLimit({
  transactions,
  budgets,
  selectedDate,
}: {
  transactions: Transaction[];
  budgets: Budget[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();
  const spent = getActualTotal({
    transactions,
    categories: categories.expenses.concat(
      categories.bills,
      categories.debt,
      categories.savings,
    ),
    date: selectedDate,
  });
  // const income = getActualTotal({
  //   transactions,
  //   categories: categories.income,
  //   date: selectedDate,
  // });
  const limit = getBudgetTotal({
    budgets,
    categories: categories.income,
    date: selectedDate,
  });
  const percent = Math.round((100 * spent) / limit);

  return (
    <Card radius="sm">
      <CardHeader>Spending limit</CardHeader>
      <CardBody>
        <p className={heading({ variant: "secondary" })}>
          Monthly transaction limit
        </p>
        <p className="my-2">
          <span className={heading()}>{currencyFormatter.format(spent)}</span>
          <span className={heading({ variant: "tertiary" })}>
            {" "}
            of {currencyFormatter.format(limit)}
          </span>
        </p>
        <div className="flex items-center justify-between gap-2">
          <Progress value={percent} />
          <p className={heading({ variant: "subtitle" })}>{percent || 0}%</p>
        </div>
      </CardBody>
      <CardFooter>
        {percent >= 80 && percent !== Infinity && (
          <Chip
            className="px-2 gap-1"
            color="danger"
            size="sm"
            startContent={<BsExclamationCircle size={14} />}
            variant="flat"
          >
            Your spending has almost reached the limit.
          </Chip>
        )}
      </CardFooter>
    </Card>
  );
}
