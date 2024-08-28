import React from "react";
import { Input } from "@nextui-org/input";

import { Budget } from "@/types";
import { editBudget } from "@/db/actions";

export default function BudgetForm({
  category,
  name,
  selectedDate,
  budgets,
}: {
  category: string;
  name: string;
  selectedDate: string;
  budgets: Budget[];
}) {
  const currentBudget = budgets.find(
    (bgt) => bgt.date === selectedDate && bgt.name === name,
  );
  const [value, setValue] = React.useState<string | undefined>();
  const [valueNumber, setValueNumber] = React.useState<number | undefined>(
    budgets?.find((bgt) => bgt.name === name)?.budget,
  );

  React.useEffect(() => {
    currentBudget && setValue(`${currentBudget?.budget}`);
  }, [selectedDate]);

  function handleChange() {
    valueNumber && setValue(`${valueNumber}`);

    valueNumber &&
      editBudget({
        ...currentBudget,
        budget: valueNumber,
        date: selectedDate,
        name: name,
        category: category,
      });
  }

  function handleOnValueChange(value: string) {
    const number = parseFloat(parseFloat(value!).toFixed(2));

    setValue(value);
    setValueNumber(number);
  }

  return (
    <Input
      aria-label="budget"
      className="min-w-[100px]"
      labelPlacement="outside"
      name="budget"
      pattern="[0-9]*[.,]?[0-9]*"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">$</span>
        </div>
      }
      type="text"
      value={value}
      variant="bordered"
      onFocusChange={handleChange}
      onValueChange={handleOnValueChange}
    />
  );
}
