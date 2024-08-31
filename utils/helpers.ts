import moment from "moment";
import { isSameMonth, parseDate } from "@internationalized/date";

import { Budget, Categories, Category, Transaction } from "@/types";

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

export function getBudgetBalance(
  items: Budget[],
  { date, category, name }: { date: string; category?: string; name?: string },
) {
  return items.reduce(
    (partialSum, item) =>
      partialSum +
      (item.date == date && (item.category == category || item.name == name)
        ? item.budget
        : 0),
    0,
  );
}

export function getActualBalance(
  items: Transaction[],
  {
    date,
    category,
    categories,
  }: { date: string; category?: string; categories?: Categories },
) {
  return items.reduce(
    (partialSum, item) =>
      partialSum +
      (isSameMonth(parseDate(`${item.date}`), parseDate(`${date}-01`)) &&
      (item.category == category ||
        categories?.labels.some(({ name }) => name == item.category_label))
        ? item.amount
        : 0),
    0,
  );
}

export function getBudgetTotal(
  items: Budget[],
  { date, categories }: { date: string; categories: Category[] },
) {
  return categories.reduce(
    (partialSum, category) =>
      partialSum +
      getBudgetBalance(items, {
        category: category.name,
        date: date,
      }),
    0,
  );
}

export function getActualTotal(
  items: Transaction[],
  { date, categories }: { date: string; categories: Category[] },
) {
  return categories.reduce(
    (partialSum, category) =>
      partialSum +
      getActualBalance(items, {
        // category: category.name,
        category: category.name,
        date: date,
      }),
    0,
  );
}
