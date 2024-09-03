import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { title } from "../primitives";

import { Budget, Transaction } from "@/types";
import { categories } from "@/utils/categories";
import { getActualTotal, getBudgetTotal } from "@/utils/helpers";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function BudgetSummary({
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
    <>
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
              {currencyFormatter.format(
                getBudgetTotal({
                  budgets,
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {currencyFormatter.format(
                getActualTotal({
                  transactions,
                  categories: categories.income,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bills</TableCell>
            <TableCell>
              {currencyFormatter.format(
                getBudgetTotal({
                  budgets,
                  categories: categories.bills,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {currencyFormatter.format(
                getActualTotal({
                  transactions,
                  categories: categories.bills,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Savings</TableCell>
            <TableCell>
              {currencyFormatter.format(
                getBudgetTotal({
                  budgets,
                  categories: categories.savings,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {currencyFormatter.format(
                getActualTotal({
                  transactions,
                  categories: categories.savings,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Debt</TableCell>
            <TableCell>
              {currencyFormatter.format(
                getBudgetTotal({
                  budgets,
                  categories: categories.debt,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {currencyFormatter.format(
                getActualTotal({
                  transactions,
                  categories: categories.debt,
                  date: selectedDate,
                }),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Expenses</TableCell>
            <TableCell>
              {currencyFormatter.format(
                getBudgetTotal({
                  budgets,
                  categories: categories.expenses,
                  date: selectedDate,
                }),
              )}
            </TableCell>
            <TableCell>
              {currencyFormatter.format(
                getActualTotal({
                  transactions,
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
