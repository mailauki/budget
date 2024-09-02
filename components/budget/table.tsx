"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useNumberFormatter } from "@react-aria/i18n";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import BudgetForm from "./form";

import { Budget, Category, Transaction } from "@/types";
import {
  getActualBalance,
  getBudgetBalance,
  getRemainingBalance,
} from "@/utils/helpers";

export default function BudgetsTable({
  budgets,
  category,
  selectedDate,
  transactions,
}: {
  budgets: Budget[];
  category: Category;
  selectedDate: string;
  transactions: Transaction[];
}) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
  });
  const formatterAcc = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "accounting",
    style: "currency",
    minimumFractionDigits: 2,
  });
  const [budgetSum, setBudgetSum] = React.useState(0);
  const [actualSum, setActualSum] = React.useState(0);
  const [remaingSum, setRemaingSum] = React.useState(0);
  const [openKeys, setOpenKeys] = React.useState(new Set([""]));
  const [showUnbudgeted, setShowUnbudgeted] = React.useState(true);

  React.useEffect(() => {
    const budget = getBudgetBalance({
      budgets,
      category: category.name,
      date: selectedDate,
    });

    setBudgetSum(budget);

    const actual = getActualBalance({
      transactions,
      categories: category,
      date: selectedDate,
    });

    setActualSum(actual);

    const remaing = budget - actual;

    setRemaingSum(
      category.name == "Income" && remaing !== budget && remaing <= 0
        ? -remaing
        : remaing,
    );

    if (budget > 0) setOpenKeys(new Set([`${category.id}`]));
    else if (budget == 0) setOpenKeys(new Set([""]));
  }, [selectedDate, budgets, transactions]);

  const filteredItems = React.useMemo(() => {
    let filteredBudgets = [...category.labels];

    if (showUnbudgeted) {
      filteredBudgets = filteredBudgets.filter((item) =>
        budgets.find(
          (bgt) =>
            bgt.date === selectedDate &&
            bgt.name === item.name &&
            bgt.category === category.name,
        ),
      );
    }

    return filteredBudgets;
  }, [budgets, showUnbudgeted]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="grow flex-1">{category.name}</div>
        <div className="w-[100px] text-right">
          <Chip size="lg" variant="light">
            {formatter.format(budgetSum)}
          </Chip>
        </div>
        <div className="w-[100px] text-right hidden sm:block">
          <Chip size="lg" variant="light">
            {formatter.format(actualSum)}
          </Chip>
        </div>
        <div className="w-[100px] text-right">
          <Chip
            color={
              remaingSum > 0 ? "success" : remaingSum < 0 ? "danger" : "default"
            }
            size="lg"
            variant="flat"
          >
            {formatter.format(remaingSum)}
          </Chip>
        </div>
      </div>
    );
  }, [category, budgetSum, actualSum, remaingSum]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between gap-2">
        {showUnbudgeted ? (
          <Button
            fullWidth
            className="justify-start text-default-400"
            startContent={<BsEye />}
            variant="light"
            onClick={() => setShowUnbudgeted(false)}
          >
            Show unbudgeted
          </Button>
        ) : (
          <Button
            fullWidth
            className="justify-start text-default-400"
            startContent={<BsEyeSlash />}
            variant="light"
            onClick={() => setShowUnbudgeted(true)}
          >
            Hide unbudgeted
          </Button>
        )}
      </div>
    );
  }, [
    category,
    budgetSum,
    actualSum,
    remaingSum,
    showUnbudgeted,
    selectedDate,
  ]);

  return (
    <Accordion
      defaultSelectedKeys={openKeys}
      selectedKeys={openKeys}
      variant="shadow"
      onSelectionChange={setOpenKeys as (keys: Selection) => void}
    >
      <AccordionItem
        key={category.id}
        aria-label={category.name}
        title={topContent}
      >
        <Divider />
        <Table
          fullWidth
          hideHeader
          removeWrapper
          aria-label="Budgets table"
          bottomContent={bottomContent}
          radius="sm"
        >
          <TableHeader>
            <TableColumn align="start" className="uppercase">
              Name
            </TableColumn>
            <TableColumn align="center" className="uppercase">
              Budget
            </TableColumn>
            <TableColumn align="end" className="uppercase hidden sm:table-cell">
              Actual
            </TableColumn>
            <TableColumn align="end" className="uppercase">
              Remaining
            </TableColumn>
          </TableHeader>
          <TableBody>
            {filteredItems.map((label) => (
              <TableRow key={label.id}>
                <TableCell className="grow flex-1">{label.name}</TableCell>
                <TableCell className="w-[100px] flex-none">
                  <BudgetForm
                    budgets={budgets}
                    category={category.name}
                    name={label.name}
                    selectedDate={selectedDate}
                  />
                </TableCell>
                <TableCell className="w-[100px] hidden sm:table-cell">
                  {formatterAcc.format(
                    getActualBalance({
                      transactions,
                      category: label.name,
                      date: selectedDate,
                    }),
                  )}
                </TableCell>
                <TableCell className="w-[100px] flex-none">
                  <Chip
                    color={
                      category.name == "Income" ||
                      getRemainingBalance({
                        transactions,
                        budgets,
                        category: label.name,
                        date: selectedDate,
                      }) ==
                        getBudgetBalance({
                          budgets,
                          category: category.name,
                          date: selectedDate,
                        }) ||
                      getRemainingBalance({
                        transactions,
                        budgets,
                        category: label.name,
                        date: selectedDate,
                      }) >= 0
                        ? "default"
                        : "danger"
                    }
                    variant="light"
                  >
                    {/* {formatterAcc.format(
                      category.name == "Income"
                        ? -(
                            getBudgetBalance(budgets, {
                              name: label.name,
                              date: selectedDate,
                            }) -
                            getActualBalance(transactions, {
                              category: label.name,
                              date: selectedDate,
                            })
                          )
                        : getBudgetBalance(budgets, {
                            name: label.name,
                            date: selectedDate,
                          }) -
                            getActualBalance(transactions, {
                              category: label.name,
                              date: selectedDate,
                            }),
                    )} */}
                    {formatterAcc.format(
                      // category.name == "Income"
                      //   ? -getRemainingBalance({
                      //       transactions,
                      //       budgets,
                      //       category: label.name,
                      //       date: selectedDate,
                      //     })
                      //   : getRemainingBalance({
                      //       transactions,
                      //       budgets,
                      //       category: label.name,
                      //       date: selectedDate,
                      //     }),
                      getRemainingBalance({
                        transactions,
                        budgets,
                        category: label.name,
                        date: selectedDate,
                      }) ==
                        getBudgetBalance({
                          budgets,
                          category: category.name,
                          date: selectedDate,
                        }) ||
                        getRemainingBalance({
                          transactions,
                          budgets,
                          category: label.name,
                          date: selectedDate,
                        }) >= 0
                        ? getRemainingBalance({
                            transactions,
                            budgets,
                            category: label.name,
                            date: selectedDate,
                          })
                        : -getRemainingBalance({
                            transactions,
                            budgets,
                            category: label.name,
                            date: selectedDate,
                          }),
                    )}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionItem>
    </Accordion>
  );
}
