import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { BsCalendar4Week, BsPlus } from "react-icons/bs";
import { today, getLocalTimeZone } from "@internationalized/date";

import { heading } from "../primitives";
import FormModal from "../modal";

import GoalForm from "./form";

import { Goal } from "@/types";
import {
  useCurrencyFormatter,
  useDateMonthFormatter,
} from "@/utils/formatters";
import { getGoalIcon } from "@/utils/icons";
import { updateGoal } from "@/db/actions";

export default function GoalCard({
  goal,
  variant = "lg",
}: {
  goal: Goal;
  variant?: "sm" | "md" | "lg";
}) {
  const currencyFormatter = useCurrencyFormatter();
  const dateFormater = useDateMonthFormatter();
  const progress = (100 * goal.current_amount) / goal.goal_amount;
  let now = today(getLocalTimeZone());
  let monthsLeft = Math.ceil(
    (goal.goal_amount - goal.current_amount) / goal.contribution,
  );
  let completionDate = now.add({
    months: monthsLeft,
  });

  return (
    <>
      {variant === "lg" && (
        <FormModal form={<GoalForm item={goal} />} type="edit" variant="goal">
          <CardHeader className="items-center justify-between">
            <div className="flex gap-5">
              <Avatar
                icon={getGoalIcon({ name: goal.name })}
                radius="full"
                size="md"
              />
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
      )}
      {variant === "md" && (
        <Card radius="sm">
          <CardHeader className="items-start justify-between">
            <p className={heading({ variant: "subtitle" })}>
              Goal {goal.priority}
            </p>
            <Tooltip content="Quick Add" placement="bottom">
              <Button
                className="pr-5"
                radius="full"
                size="md"
                startContent={<BsPlus size={20} />}
                variant="solid"
                onPress={() =>
                  updateGoal({
                    goal: {
                      ...goal,
                      current_amount: goal.current_amount + goal.contribution,
                    },
                  })
                }
              >
                {currencyFormatter.format(goal.contribution)}
              </Button>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <Avatar
              icon={getGoalIcon({ name: goal.name, size: 24 })}
              radius="sm"
              size="lg"
            />
          </CardBody>
          <CardFooter className="items-center justify-between mb-2">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className={heading()}>{goal.name}</h4>
                <p>
                  <span>{currencyFormatter.format(goal.current_amount)}</span>
                  <span className={heading({ variant: "tertiary" })}>
                    {" "}
                    / {currencyFormatter.format(goal.goal_amount)}
                  </span>
                </p>
                <p className={heading({ variant: "tertiary" })}>
                  <span className="inline-flex">
                    <BsCalendar4Week />
                  </span>{" "}
                  Complete by:{" "}
                  {dateFormater.format(
                    completionDate.toDate(getLocalTimeZone()),
                  )}
                </p>
                {/* <p className={heading({ variant: "tertiary" })}>
                  <span className="inline-flex">
                    <BsCalendar4Week />
                  </span>{" "}
                  Months left: {monthsLeft}
                </p> */}
              </div>
            </div>
            <CircularProgress
              showValueLabel
              aria-label="Progress"
              size="lg"
              value={progress}
            />
          </CardFooter>
        </Card>
      )}
      {variant === "sm" && (
        <Card radius="sm">
          <CardHeader className="items-start justify-between">
            <div className="flex gap-5">
              <Avatar
                icon={getGoalIcon({ name: goal.name })}
                radius="full"
                size="md"
              />
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
                {Math.round((100 * goal.current_amount) / goal.goal_amount) ||
                  0}
                %
              </span>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
