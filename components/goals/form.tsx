"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";

import { Goal } from "@/types";

export default function GoalForm({ item }: { item?: Goal }) {
  const [goalAmount, setGoalAmount] = React.useState(item?.goal_amount || "");
  const [goalAmountNumber, setGoalAmountNumber] = React.useState<
    number | undefined
  >(item?.goal_amount);
  const [currentAmount, setCurrentAmount] = React.useState(
    item?.current_amount || "",
  );
  const [currentAmountNumber, setCurrentAmountNumber] = React.useState<
    number | undefined
  >(item?.current_amount);
  const [name, setName] = React.useState(item?.name ?? "");

  function handleChange() {
    goalAmountNumber && setGoalAmount(`${goalAmountNumber}`);
    currentAmountNumber && setCurrentAmount(`${currentAmountNumber}`);
  }

  function handleGoalOnValueChange(value: string) {
    const number = parseFloat(parseFloat(value!).toFixed(2));

    setGoalAmount(value);
    setGoalAmountNumber(number);
  }

  function handleCurrentOnValueChange(value: string) {
    const number = parseFloat(parseFloat(value!).toFixed(2));

    setCurrentAmount(value);
    setCurrentAmountNumber(number);
  }

  return (
    <div className="flex flex-col gap-3">
      <input hidden defaultValue={item?.id} name="id" />
      <Input
        id="name"
        label="Name"
        name="name"
        radius="sm"
        value={name}
        variant="bordered"
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        id="amount"
        label="Goal Amount"
        name="goal_amount"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
        radius="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        type="text"
        value={`${goalAmount}`}
        variant="bordered"
        onFocusChange={handleChange}
        onValueChange={handleGoalOnValueChange}
      />
      <Input
        id="amount"
        label="Current Amount"
        name="current_amount"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
        radius="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        type="text"
        value={`${currentAmount}`}
        variant="bordered"
        onFocusChange={handleChange}
        onValueChange={handleCurrentOnValueChange}
      />
      <div className="flex py-2 px-1 justify-between">
        <Button
          className={`${!item ? "hidden" : "inherit"}`}
          color="danger"
          variant="light"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
