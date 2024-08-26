"use client";

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";
import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

import { addTransaction } from "@/app/db/actions";
import { categories } from "@/utils/helpers";

export default function TranactionForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const expenses = categories.expenses.flatMap((category) => category.labels);
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const [category, setCategory] = React.useState("Uncategorized");
  const [amount, setAmount] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [isCredit, setIsCredit] = React.useState(false);

  return (
    <>
      <Button
        className="bg-foreground text-background"
        endContent={<BsPlus />}
        radius="sm"
        onPress={onOpen}
      >
        Add New
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent action={addTransaction} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new transaction
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  id="date"
                  label="Date"
                  name="date"
                  value={date}
                  variant="bordered"
                  onChange={setDate}
                />
                <Input
                  replace-comma
                  id="amount"
                  inputMode="decimal"
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
                  value={amount}
                  variant="bordered"
                  onChange={(event) =>
                    setAmount(event.target.value.replace(",", ""))
                  }
                />
                <Select
                  id="category"
                  label="Select a category"
                  name="category"
                  selectedKeys={[category]}
                  value={category}
                  variant="bordered"
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {expenses.map((category) => (
                    <SelectItem key={category.label}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
                {/* <Select
                  id="account"
                  label="Select an account"
                  name="account"
                  variant="bordered"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.label}</SelectItem>
                  ))}
                </Select> */}
                <Input
                  id="label"
                  label="Label"
                  name="label"
                  value={label}
                  variant="bordered"
                  onChange={(event) => setLabel(event.target.value)}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
