import { Input } from "@nextui-org/input";
import React from "react";

import { editBudget } from "@/app/db/actions";
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
  const currentBudget = budgets?.find(
    (bgt) => bgt.date === selectedDate && bgt.name === label,
  );

  const [value, setValue] = React.useState(
    new Intl.NumberFormat().format(
      budgets?.find(({ name }) => name === label)?.budget || 0,
    ),
  );

  React.useEffect(() => {
    setValue(new Intl.NumberFormat().format(currentBudget?.budget || 0));
  }, [selectedDate]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value.replace(",", ""));

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
    // formRef.dispatchEvent(new Event("submit"));
    // handleSumbit(event);
  }

  // function handleSumbit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   event.currentTarget.form?.requestSubmit();
  // }

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (
  //     (event.ctrlKey || event.metaKey) &&
  //     (event.key === "Enter" || event.key === "NumpadEnter")
  //   ) {
  //     event.preventDefault();
  //     event.currentTarget.form?.requestSubmit();
  //   }
  // };

  return (
    <form action={editBudget}>
      <input className="hidden" name="id" value={currentBudget?.id} />
      <input className="hidden" name="category" value={category} />
      <input className="hidden" name="label" value={label} />
      <input className="hidden" name="date" value={selectedDate} />
      <Input
        className="w-[100px]"
        name="budget"
        pattern="[0-9]*[.,]?[0-9]*"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        value={value}
        variant="bordered"
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
      />
      <button className="hidden" type="submit">
        Submit
      </button>
    </form>
  );
}
