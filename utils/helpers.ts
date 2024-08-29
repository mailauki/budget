import moment from "moment";
import { isSameMonth, parseDate } from "@internationalized/date";

import { Budget, Categories, Category, Transaction } from "@/types";

export const categories = {
  income: [
    {
      id: 1,
      name: "Income",
      labels: [
        { id: 1, name: "Paychecks" },
        { id: 2, name: "Interest" },
        { id: 3, name: "Business Income" },
        { id: 4, name: "Other Income" },
        { id: 5, name: "Dividens & Capital Gains" },
      ],
    },
  ],
  expenses: [
    {
      id: 1,
      name: "Housing",
      labels: [
        { id: 1, name: "Rent" },
        { id: 2, name: "Mortgage" },
        { id: 3, name: "Home Improvement" },
      ],
    },
    {
      id: 2,
      name: "Bills & Utilities",
      labels: [
        { id: 1, name: "Phone" },
        { id: 2, name: "Garbage" },
        { id: 3, name: "Water" },
        { id: 4, name: "Gas & Electric" },
        { id: 5, name: "Internet & Cable" },
      ],
    },
    {
      id: 3,
      name: "Food & Dining",
      labels: [
        { id: 1, name: "Restaurants & Bars" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Coffee Shops" },
      ],
    },
    {
      id: 4,
      name: "Travel & Lifestyle",
      labels: [
        { id: 1, name: "Entertainment & Recreation" },
        { id: 2, name: "Travel & Vacation" },
        { id: 3, name: "Personal" },
        { id: 4, name: "Pets" },
        { id: 5, name: "Fun Money" },
      ],
    },
    {
      id: 5,
      name: "Shopping",
      labels: [
        { id: 1, name: "Shopping" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Furniture & Housewares" },
        { id: 4, name: "Electronics" },
      ],
    },
    {
      id: 6,
      name: "Education",
      labels: [
        { id: 1, name: "Student Loans" },
        { id: 2, name: "Education" },
      ],
    },
    {
      id: 7,
      name: "Health & Wellness",
      labels: [
        { id: 1, name: "Medical" },
        { id: 2, name: "Dentist" },
        { id: 3, name: "Fitness" },
      ],
    },
    {
      id: 8,
      name: "Finacial",
      labels: [
        { id: 1, name: "Loan Repayment" },
        { id: 2, name: "Finacial & Legal Services" },
        { id: 3, name: "Finacial Fees" },
        { id: 4, name: "Cash & ATM" },
        { id: 5, name: "Insurance" },
        { id: 6, name: "Taxes" },
      ],
    },
    {
      id: 9,
      name: "Other",
      labels: [
        { id: 1, name: "Miscellaneous" },
        { id: 2, name: "Uncategorized" },
        { id: 3, name: "Check" },
      ],
    },
  ],
  contributions: [{ id: 1, name: "Goals" }],
}; // update to db

export const expenses = categories.expenses.flatMap(
  (category) => category.labels,
);

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
        categories?.labels.some(({ name }) => name == item.category))
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
