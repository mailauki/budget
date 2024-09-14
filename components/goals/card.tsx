import { Avatar, CardHeader, CircularProgress } from "@nextui-org/react";
import React from "react";

import { heading } from "../primitives";
import FormModal from "../modal";

import GoalForm from "./form";

import { Goal } from "@/types";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getGoalIcon } from "@/utils/icons";

export default function GoalCard({ goal }: { goal: Goal }) {
  const currencyFormatter = useCurrencyFormatter();
  const progress = (100 * goal.current_amount) / goal.goal_amount;

  return (
    <>
      <FormModal form={<GoalForm item={goal} />} type="edit" variant="goal">
        <CardHeader className="items-center justify-between">
          <div className="flex gap-5">
            <Avatar icon={getGoalIcon(goal.name)} radius="full" size="md" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className={heading()}>{goal.name}</h4>
              <p className={heading({ variant: "tertiary" })}>
                Monthly contribution:{" "}
                {currencyFormatter.format(goal.contribution)}
              </p>
            </div>
          </div>
          <p>
            <span>{currencyFormatter.format(goal.current_amount)}</span>
            <span className={heading({ variant: "tertiary" })}>
              {" "}
              / {currencyFormatter.format(goal.goal_amount)}
            </span>
          </p>
          <CircularProgress
            showValueLabel
            aria-label="Progress"
            size="lg"
            value={progress}
          />
        </CardHeader>
      </FormModal>
    </>
  );
}
