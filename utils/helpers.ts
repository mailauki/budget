import moment from "moment";
import { isSameMonth, parseDate } from "@internationalized/date";

import { Budget, Category, Transaction } from "@/types";

export function getDatesBetween(
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
) {
  let dates = [];
  let currentDate = moment(startDate);
  let lastDate = moment(endDate);

  while (currentDate.isSameOrBefore(lastDate)) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "month");
  }

  return dates;
}

export function getBudgetBalance({
  budgets,
  date,
  category,
  name,
}: {
  budgets: Budget[];
  date: string;
  category?: string;
  name?: string;
}) {
  return budgets.reduce(
    (partialSum, item) =>
      partialSum +
      (item.date == date && (item.category == category || item.name == name)
        ? item.budget
        : 0),
    0,
  );
}

export function getActualBalance({
  transactions,
  date,
  category,
  categories,
}: {
  transactions: Transaction[];
  date: string;
  category?: string;
  categories?: Category;
}) {
  return transactions.reduce(
    (partialSum, item) =>
      partialSum +
      (isSameMonth(parseDate(`${item.date}`), parseDate(`${date}-01`)) &&
      (item.category == category ||
        // item.category_label == category ||
        categories?.labels.some(({ name }) => name == item.category_label))
        ? item.amount
        : 0),
    0,
  );
}

export function getRemainingBalance({
  transactions,
  budgets,
  category,
  date,
}: {
  transactions: Transaction[];
  budgets: Budget[];
  category: string;
  date: string;
}) {
  return (
    getBudgetBalance({ budgets, name: category, date }) -
    getActualBalance({ transactions, category, date })
  );
}

export function getBudgetTotal({
  budgets,
  date,
  categories,
}: {
  budgets: Budget[];
  date: string;
  categories: Category[];
}) {
  return categories.reduce(
    (partialSum, category) =>
      partialSum +
      getBudgetBalance({ budgets, category: category.name, date: date }),
    0,
  );
}

export function getActualTotal({
  transactions,
  date,
  categories,
}: {
  transactions: Transaction[];
  date: string;
  categories: Category[];
}) {
  return categories.reduce(
    (partialSum, category) =>
      partialSum +
      getActualBalance({ transactions, categories: category, date }),
    0,
  );
}
