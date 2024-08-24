/* eslint-disable no-console */
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
import BudgetForm from "./form";

export default function BudgetList({ budgets }: { budgets: Budget[] }) {
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
                    <BudgetForm
                      budgets={budgets}
                      category={category.label}
                      label={label.label}
                      selectedDate={selectedDate}
                    />
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
                    <BudgetForm
                      budgets={budgets}
                      category={category.label}
                      label={label.label}
                      selectedDate={selectedDate}
                    />
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
