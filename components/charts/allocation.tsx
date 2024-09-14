import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import { DonutChart } from "@tremor/react";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getCategoryColor } from "@/utils/colors";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";

export default function AllocationChart({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  const currencyFormatter = useCurrencyFormatter();

  function budgetPercent(number: number) {
    const income = getBudgetTotal({
      budgets,
      categories: categories.income,
      date: selectedDate,
    });

    return Math.ceil((100 * number) / income);
  }
  function actualPercent(number: number) {
    const income = getActualTotal({
      transactions,
      categories: categories.income,
      date: selectedDate,
    });

    return Math.ceil((100 * number) / income);
  }

  const data_allocation = [
    {
      name: "Bills",
      budget: getBudgetTotal({
        budgets,
        categories: categories.bills,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.bills,
        date: selectedDate,
      }),
      color: "cyan",
    },
    {
      name: "Savings",
      budget: getBudgetTotal({
        budgets,
        categories: categories.savings,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.savings,
        date: selectedDate,
      }),
      color: "blue",
    },
    {
      name: "Debt",
      budget: getBudgetTotal({
        budgets,
        categories: categories.debt,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.debt,
        date: selectedDate,
      }),
      color: "indigo",
    },
    {
      name: "Expenses",
      budget: getBudgetTotal({
        budgets,
        categories: categories.expenses,
        date: selectedDate,
      }),
      amount: getActualTotal({
        transactions,
        categories: categories.expenses,
        date: selectedDate,
      }),
      color: "violet",
    },
  ];

  const data_needs = [
    {
      name: "Needs",
      expected: 50,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.bills,
          date: selectedDate,
        }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.bills,
          date: selectedDate,
        }),
      ),
      color: "cyan",
    },
    {
      name: "Wants",
      expected: 30,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.expenses,
          date: selectedDate,
        }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.expenses,
          date: selectedDate,
        }),
      ),
      color: "blue",
    },
    {
      name: "Savings & Debt",
      expected: 20,
      budget: budgetPercent(
        getBudgetTotal({
          budgets,
          categories: categories.savings,
          date: selectedDate,
        }) +
          getBudgetTotal({
            budgets,
            categories: categories.debt,
            date: selectedDate,
          }),
      ),
      actual: actualPercent(
        getActualTotal({
          transactions,
          categories: categories.savings,
          date: selectedDate,
        }) +
          getActualTotal({
            transactions,
            categories: categories.debt,
            date: selectedDate,
          }),
      ),
      color: "indigo",
    },
  ];

  const data_category = categories.expenses.flatMap((category) =>
    Object.assign({
      name: category.name,
      amount: transactions
        .filter((ta) => ta.category == category.name)
        .reduce((partialSum, item) => partialSum + item.amount, 0),
      percent: Math.ceil(
        (100 *
          transactions
            .filter((ta) => ta.category == category.name)
            .reduce((partialSum, item) => partialSum + item.amount, 0)) /
          transactions
            .filter((ta) => ta.category == "Income")
            .reduce((partialSum, item) => partialSum + item.amount, 0),
      ),
      color: getCategoryColor(category.name),
    }),
  );

  return (
    <Card radius="sm">
      <CardBody>
        <Tabs fullWidth radius="full">
          <Tab key="allocation" title="Allocation">
            <div
              className="flex justify-evenly items-center"
              style={{ height: "180px" }}
            >
              <DonutChart
                aria-label="Allocation summary chart"
                category="amount"
                colors={data_allocation.flatMap((item) => item.color)}
                data={data_allocation}
                index="name"
                showLabel={false}
                valueFormatter={(amount) => currencyFormatter.format(amount)}
              />
              <div className="w-2/5 min-w-[160px] flex flex-col px-2">
                {data_allocation.map((item) => (
                  <Chip
                    key={item.name}
                    className="border-none gap-1"
                    classNames={{
                      dot: `bg-${item.color}-500`,
                    }}
                    variant="dot"
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </div>
          </Tab>
          <Tab key="50-30-20" title="50/30/20">
            <div
              className="flex justify-evenly items-center"
              style={{ height: "180px" }}
            >
              <DonutChart
                aria-label="50-30-20 chart"
                category="actual"
                colors={data_needs.flatMap((item) => item.color)}
                data={data_needs}
                index="name"
                showLabel={false}
                valueFormatter={(amount) => `${amount}%`}
              />
              <div className="w-2/5 min-w-[160px] flex flex-col px-2">
                {data_needs.map((item) => (
                  <Chip
                    key={item.name}
                    className="border-none gap-1"
                    classNames={{
                      dot: `bg-${item.color}-500`,
                    }}
                    variant="dot"
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </div>
          </Tab>
          <Tab key="expenses" title="Expenses">
            <div
              className="flex justify-evenly items-center"
              style={{ height: "180px" }}
            >
              <DonutChart
                aria-label="Expense summary chart"
                category="amount"
                colors={data_category.flatMap((item) => item.color)}
                data={data_category}
                index="name"
                showLabel={false}
                valueFormatter={(amount) => currencyFormatter.format(amount)}
              />
              <div className="w-2/5 min-w-[160px] flex flex-col px-2">
                {data_category.map((item) => (
                  <Chip
                    key={item.name}
                    className="border-none gap-1"
                    classNames={{
                      dot: `bg-${item.color}-500`,
                    }}
                    variant="dot"
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
