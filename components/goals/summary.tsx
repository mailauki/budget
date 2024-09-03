import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

import { Goal } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function GoalsSummary({ goals }: { goals?: Goal[] }) {
  const currencyFormatter = useCurrencyFormatter();

  const renderCell = React.useCallback((goal: Goal, columnKey: React.Key) => {
    const cellValue = goal[columnKey as keyof Goal];

    switch (columnKey) {
      case "name":
        return cellValue;
      case "goal":
        return currencyFormatter.format(goal.goal_amount || 0);
      case "current":
        return currencyFormatter.format(goal.current_amount || 0);
      case "remaining":
        return currencyFormatter.format(
          goal.goal_amount - goal.current_amount || 0,
        );
      case "progress":
        return `${Math.round((100 * goal.current_amount) / goal.goal_amount) || 0}%`;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table className="col-span-full">
      <TableHeader>
        <TableColumn key="name" className="uppercase">
          Name
        </TableColumn>
        <TableColumn
          key="priority"
          align="center"
          className="uppercase hidden md:table-cell"
        >
          Priority
        </TableColumn>
        <TableColumn key="goal" align="end" className="uppercase">
          Goal Amount
        </TableColumn>
        <TableColumn key="current" align="end" className="uppercase">
          Current Amount
        </TableColumn>
        <TableColumn
          key="remaining"
          align="end"
          className="uppercase hidden sm:table-cell"
        >
          Remaining Amount
        </TableColumn>
        <TableColumn key="progress" align="end" className="uppercase">
          Progress
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No goals yet"} items={goals}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell
                className={`${columnKey == "priority" ? "hidden md:table-cell" : columnKey == "remaining" ? "hidden sm:table-cell" : "table-cell"}`}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
