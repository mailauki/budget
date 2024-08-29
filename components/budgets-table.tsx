"use client";

import {
  Accordion,
  AccordionItem,
  Chip,
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

import BudgetForm from "./budget-form";

import { Budget, Categories, Transaction } from "@/types";
import { getActualBalance, getBudgetBalance } from "@/utils/helpers";

export default function BudgetsTable({
  budgets,
  category,
  selectedDate,
  transactions,
}: {
  budgets: Budget[];
  category: Categories;
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

  React.useEffect(() => {
    const budget = getBudgetBalance(budgets, {
      category: category.name,
      date: selectedDate,
    });

    setBudgetSum(budget);

    const actual = getActualBalance(transactions, {
      categories: category,
      date: selectedDate,
    });

    setActualSum(actual);

    const remaing = budget - actual;

    setRemaingSum(remaing);

    if (budget > 0) setOpenKeys(new Set([`${category.id}`]));
    else if (budget == 0) setOpenKeys(new Set([""]));
  }, [selectedDate, budgets, transactions]);

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

  return (
    <>
      <Accordion
        defaultSelectedKeys={openKeys}
        selectedKeys={openKeys}
        onSelectionChange={setOpenKeys as (keys: Selection) => void}
      >
        <AccordionItem
          key={category.id}
          aria-label={category.name}
          title={topContent}
        >
          <Table fullWidth aria-label="Budgets table" radius="sm">
            <TableHeader>
              <TableColumn align="start" className="uppercase">
                Name
              </TableColumn>
              <TableColumn align="center" className="uppercase">
                Budget
              </TableColumn>
              <TableColumn
                align="end"
                className="uppercase hidden sm:table-cell"
              >
                Actual
              </TableColumn>
              <TableColumn align="end" className="uppercase">
                Remaining
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
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
                      getActualBalance(transactions, {
                        category: label.name,
                        date: selectedDate,
                      }),
                    )}
                  </TableCell>
                  <TableCell className="w-[100px] flex-none">
                    <Chip
                      color={
                        getBudgetBalance(budgets, {
                          name: label.name,
                          date: selectedDate,
                        }) -
                          getActualBalance(transactions, {
                            category: label.name,
                            date: selectedDate,
                          }) >
                        0
                          ? "success"
                          : getBudgetBalance(budgets, {
                                name: label.name,
                                date: selectedDate,
                              }) -
                                getActualBalance(transactions, {
                                  category: label.name,
                                  date: selectedDate,
                                }) <
                              0
                            ? "danger"
                            : "default"
                      }
                      variant="light"
                    >
                      {formatterAcc.format(
                        getBudgetBalance(budgets, {
                          name: label.name,
                          date: selectedDate,
                        }) -
                          getActualBalance(transactions, {
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
    </>
  );
}
