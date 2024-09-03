"use client";

import { Button, ButtonGroup, Input } from "@nextui-org/react";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  const [priority, setPriority] = React.useState(item?.priority ?? 0);

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

  function increment() {
    if (priority >= 0 && priority < 5) setPriority(priority + 1);
  }

  function decrement() {
    if (priority > 0) setPriority(priority - 1);
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
        <div className="flex items-center gap-2">
          <p className="text-tiny text-black/70 dark:text-white/90 font-medium ml-3">
            Priority
          </p>
          <input hidden name="priority" value={priority} />
          <ButtonGroup radius="sm" variant="ghost">
            <Button isIconOnly onPress={decrement}>
              <BsChevronLeft />
            </Button>
            <Button disabled isIconOnly variant="bordered">
              {priority}
            </Button>
            <Button isIconOnly onPress={increment}>
              <BsChevronRight />
            </Button>
          </ButtonGroup>
        </div>
        <Button
          className={`${!item ? "hidden" : "inherit"}`}
          color="danger"
          radius="sm"
          variant="light"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
