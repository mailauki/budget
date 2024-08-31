import {
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useNumberFormatter } from "@react-aria/i18n";

import { title } from "./primitives";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";

export default function BudgetSummary({
  budgets,
  transactions,
  selectedDate,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  selectedDate: string;
}) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    // trailingZeroDisplay: "stripIfInteger",
    // roundingPriority: "auto",
  });

  return (
    <>
      <Card radius="sm">
        <CardHeader className="flex-col justify-center text-center py-12 gap-1">
          <p className="text-default-500">Left to spend</p>
          <p className={title()}>
            {formatter.format(
              getActualTotal(transactions, {
                categories: categories.income,
                date: selectedDate,
              }) -
                getActualTotal(transactions, {
                  categories: categories.expenses,
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
            {formatter.format(
              getBudgetTotal(budgets, {
                categories: categories.income,
                date: selectedDate,
              }) -
                getBudgetTotal(budgets, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
            )}
          </Chip>
        </CardFooter>
      </Card>
      <Table radius="sm">
        <TableHeader>
          <TableColumn isRowHeader className="uppercase">
            Name
          </TableColumn>
          <TableColumn align="end" className="uppercase">
            Budget
          </TableColumn>
          <TableColumn align="end" className="uppercase">
            Actual
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Rollover</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Income</TableCell>
            <TableCell>
              {formatter.format(
                getBudgetTotal(budgets, {
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {formatter.format(
                getActualTotal(transactions, {
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bills</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Savings</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Debt</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>$0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Expenses</TableCell>
            <TableCell>
              {formatter.format(
                getBudgetTotal(budgets, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {formatter.format(
                getActualTotal(transactions, {
                  categories: categories.expenses,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
