import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Listbox,
  ListboxItem,
  Switch,
} from "@nextui-org/react";
import React from "react";

import { heading } from "../primitives";

import { Goal } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function GoalsSummary({ goals }: { goals?: Goal[] }) {
  const currencyFormatter = useCurrencyFormatter();
  const active = goals?.filter(
    (goal) => goal.current_amount < goal.goal_amount,
  );
  const [showCompleted, setShowCompleted] = React.useState(false);

  return (
    <Card radius="sm">
      <CardHeader>
        <h2 className={heading()}>Summary</h2>
      </CardHeader>
      <CardBody>
        <Listbox emptyContent="No goals added yet" variant="flat">
          {(showCompleted ? goals : active)!.map((goal) => (
            <ListboxItem key={goal.name} isReadOnly className="mb-3">
              <div className="flex items-start justify-between flex-wrap gap-1">
                <p className="h-7">
                  {goal.priority > 0 && (
                    <span className={heading({ variant: "secondary" })}>
                      {goal.priority}.{" "}
                    </span>
                  )}
                  <span className="text-base">{goal.name}</span>
                </p>
                <Chip
                  className="text-tiny"
                  color="default"
                  size="md"
                  variant="flat"
                >
                  {currencyFormatter.format(goal.current_amount)} /{" "}
                  {currencyFormatter.format(goal.goal_amount)}
                </Chip>
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
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
      <CardFooter>
        {active!.length !== goals!.length && (
          <Switch size="sm" onChange={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Hide" : "Show"} completed
          </Switch>
        )}
      </CardFooter>
    </Card>
  );
}
