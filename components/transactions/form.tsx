"use client";

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";
import React from "react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";

export default function TransactionForm({ item }: { item?: Transaction }) {
  const [date, setDate] = React.useState(
    item?.date ? parseDate(`${item.date}`) : today(getLocalTimeZone()),
  );
  const [category, setCategory] = React.useState(item?.category || "Other");
  const [categoryLabel, setCategoryLabel] = React.useState(
    item?.category_label || "Uncategorized",
  );
  const [amount, setAmount] = React.useState(item?.amount || "");
  const [amountNumber, setAmountNumber] = React.useState<number | undefined>(
    item?.amount,
  );
  const [name, setName] = React.useState(item?.name ?? "");
  const [isCredit, setIsCredit] = React.useState(item?.credit || false);

  function handleChange() {
    amountNumber && setAmount(`${amountNumber}`);
  }

  function handleOnValueChange(value: string) {
    const number = parseFloat(parseFloat(value!).toFixed(2));

    setAmount(value);
    setAmountNumber(number);
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
      <DatePicker
        label="Date"
        name="date"
        radius="sm"
        value={date}
        variant="bordered"
        onChange={setDate}
      />
      <Input
        label="Amount"
        name="amount"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
        radius="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        type="text"
        value={`${amount}`}
        variant="bordered"
        onFocusChange={handleChange}
        onValueChange={handleOnValueChange}
      />
      <Select
        isMultiline
        items={categories.income.concat(
          categories.expenses,
          categories.bills,
          categories.debt,
          categories.savings,
        )}
        label="Select a category"
        name="category_label"
        radius="sm"
        selectedKeys={[categoryLabel]}
        value={categoryLabel}
        variant="bordered"
        onChange={(event) => {
          setCategoryLabel(event.target.value);
          setCategory(
            categories.income
              .concat(
                categories.expenses,
                categories.bills,
                categories.debt,
                categories.savings,
              )
              .find((cat) =>
                cat.labels.find(({ name }) => name == event.target.value),
              )?.name!,
          );
        }}
      >
        {(category) => (
          <SelectSection key={category.name} showDivider title={category.name}>
            {category.labels.map((label) => (
              <SelectItem key={label.name}>{label.name}</SelectItem>
            ))}
          </SelectSection>
        )}
      </Select>
      <input hidden name="category" value={category} />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
          color="default"
          isSelected={isCredit}
          radius="sm"
          onValueChange={setIsCredit}
        >
          Credit card {isCredit ? "" : "not"} used
        </Checkbox>
        <input
          readOnly
          className="hidden"
          id="credit"
          name="credit"
          value={isCredit ? "true" : "false"}
        />
        <Button
          className={`${!item ? "hidden" : "inherit"}`}
          color="danger"
          radius="full"
          variant="light"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
