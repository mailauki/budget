"use client";

import {
  Checkbox,
  Chip,
  DatePicker,
  Input,
  Link,
  Select,
  SelectedItems,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

import { Category, Transaction } from "@/types";
import { expenses } from "@/utils/helpers";

export default function TransactionForm({ item }: { item?: Transaction }) {
  const [date, setDate] = React.useState(
    item?.date ? parseDate(`${item.date}`) : today(getLocalTimeZone()),
  );
  const [category, setCategory] = React.useState(
    item?.category || "Uncategorized",
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
      <DatePicker
        id="date"
        label="Date"
        name="date"
        value={date}
        variant="bordered"
        onChange={setDate}
      />
      <Input
        id="amount"
        label="Amount"
        name="amount"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
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
        id="category"
        items={expenses}
        label="Select a category"
        name="category"
        renderValue={(items: SelectedItems<Category>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          );
        }}
        selectedKeys={[category]}
        value={category}
        variant="bordered"
        onChange={(event) => setCategory(event.target.value)}
      >
        {(category) => (
          <SelectItem key={category.name}>{category.name}</SelectItem>
        )}
      </Select>
      <Input
        id="name"
        label="Name"
        name="name"
        value={name}
        variant="bordered"
        onChange={(event) => setName(event.target.value)}
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
          isSelected={isCredit}
          onValueChange={setIsCredit}
        >
          Credit card
        </Checkbox>
        <input
          readOnly
          className="hidden"
          id="credit"
          name="credit"
          value={isCredit ? "true" : "false"}
        />
        <Link color="primary" href="#" size="sm" />
      </div>
    </div>
  );
}
