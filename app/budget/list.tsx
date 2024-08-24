"use client";

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";
import React from "react";

import { editBudget } from "../db/actions";

import DateSelector from "./date-select";

import { Budget } from "@/types";
import { categories } from "@/utils/helpers";

export default function BudgetList({
  budgets,
}: {
  budgets: Budget[] | undefined;
}) {
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
  );

  function changeDate(date: React.SetStateAction<string>) {
    setSelectedDate(date);
  }

  React.useEffect(() => {
    let element = document.getElementById(selectedDate);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [selectedDate]);

  return (
    <>
      <DateSelector changeDate={changeDate} selectedDate={selectedDate} />
      {categories.income.map((category) => (
        <>
          <p>{category.label}</p>
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase">Actual</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell>{label.label}</TableCell>
                  <TableCell>
                    <form action={editBudget}>
                      <input
                        className="hidden"
                        name="label"
                        value={label.label}
                      />
                      <input
                        className="hidden"
                        name="date"
                        value={selectedDate}
                      />
                      <Input
                        className="w-[90px]"
                        name="budget"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        variant="bordered"
                      />
                      <button className="hidden" type="submit">
                        Submit
                      </button>
                    </form>
                  </TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}
      {categories.expenses.map((category) => (
        <>
          <p>{category.label}</p>
          <Table fullWidth aria-label="Budgets table">
            <TableHeader>
              <TableColumn className="uppercase">Name</TableColumn>
              <TableColumn className="uppercase">Budget</TableColumn>
              <TableColumn className="uppercase">Actual</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
              {category.labels.map((label) => (
                <TableRow key={label.label}>
                  <TableCell>{label.label}</TableCell>
                  <TableCell>
                    <form action={editBudget}>
                      <input
                        className="hidden"
                        name="label"
                        value={label.label}
                      />
                      <input
                        className="hidden"
                        name="date"
                        value={selectedDate}
                      />
                      <Input
                        className="w-[90px]"
                        name="budget"
                        value={`$${
                          budgets?.find((bgt) => {
                            if (bgt.label == label.label)
                              return bgt.budget.toFixed(2);
                          }) || (0).toFixed(2)
                        }`}
                        variant="bordered"
                      />
                      <button className="hidden" type="submit">
                        Submit
                      </button>
                    </form>
                  </TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}
    </>
  );
}
