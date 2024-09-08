import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Progress,
} from "@nextui-org/react";
import React from "react";

import { heading } from "../primitives";

import { Goal } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getGoalIcon } from "@/utils/icons";

export default function GoalCard({ goal }: { goal: Goal }) {
  const currencyFormatter = useCurrencyFormatter();
  const progress = (100 * goal.current_amount) / goal.goal_amount;

  return (
    <Card radius="sm">
      <CardHeader className="items-start justify-between">
        <div className="flex gap-5">
          <Avatar icon={getGoalIcon(goal.name)} radius="full" size="md" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className={heading()}>{goal.name}</h4>
            <p>
              <span className="text-base">
                {currencyFormatter.format(goal.current_amount)}
              </span>
              <span className={heading({ variant: "tertiary" })}>
                {" "}
                of {currencyFormatter.format(goal.goal_amount)}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Progress color="default" value={progress} />
          <span className={heading({ variant: "subtitle" })}>
            {Math.round((100 * goal.current_amount) / goal.goal_amount) || 0}%
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
