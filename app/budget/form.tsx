import { Input } from "@nextui-org/input";
import React from "react";

import { editBudget } from "../db/actions";

import { Budget } from "@/types";

export default function BudgetForm({
  category,
  label,
  selectedDate,
  budgets,
}: {
  category: string;
  label: string;
  selectedDate: string;
  budgets: Budget[];
}) {
  const [value, setValue] = React.useState(
    new Intl.NumberFormat().format(
      budgets?.find((bgt) => bgt.label === label)?.budget || 0,
    ),
  );

  return (
    <form action={editBudget}>
      <input className="hidden" name="category" value={category} />
      <input className="hidden" name="label" value={label} />
      <input className="hidden" name="date" value={selectedDate} />
      <Input
        className="w-[100px]"
        name="budget"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        value={value}
        variant="bordered"
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="hidden" type="submit">
        Submit
      </button>
    </form>
  );
}
