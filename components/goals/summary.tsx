import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React from "react";

import { heading } from "../primitives";

import { Goal } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function GoalsSummary({ goals }: { goals?: Goal[] }) {
  const currencyFormatter = useCurrencyFormatter();

  return (
    <Card className="hidden sm:flex" radius="sm">
      <CardHeader>
        <h2 className={heading()}>Summary</h2>
      </CardHeader>
      <CardBody>
        <Listbox variant="flat">
          {goals!.map((goal) => (
            <ListboxItem key={goal.name}>
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <p className="h-7">
                    {goal.priority > 0 && (
                      <span className={heading({ variant: "secondary" })}>
                        {goal.priority}.{" "}
                      </span>
                    )}
                    <span className="text-base">{goal.name}</span>
                  </p>
                  <p>
                    <span className={heading({ variant: "subtitle" })}>
                      Left to save:{" "}
                    </span>
                    <span className={heading({ variant: "tertiary" })}>
                      {currencyFormatter.format(
                        goal.goal_amount - goal.current_amount || 0,
                      )}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end justify-between">
                  <Chip
                    className="text-tiny"
                    color="default"
                    size="md"
                    variant="flat"
                  >
                    {currencyFormatter.format(goal.current_amount)} /{" "}
                    {currencyFormatter.format(goal.goal_amount)}
                  </Chip>
                  <p className="mr-1">
                    <span className={heading({ variant: "subtitle" })}>
                      Months left:{" "}
                    </span>
                    <span className={heading({ variant: "tertiary" })}>
                      {Math.round(
                        (goal.goal_amount - goal.current_amount || 0) /
                          goal.contribution,
                      ) === Infinity
                        ? "N/A"
                        : Math.round(
                            (goal.goal_amount - goal.current_amount || 0) /
                              goal.contribution,
                          )}
                    </span>
                  </p>
                </div>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
