"use client";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import { addTransaction } from "../db/actions";

import { categories } from "@/utils/helpers";

export default function NewTranactionForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button fullWidth variant="ghost" onPress={onOpen}>
        Add transaction
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
                  variant="bordered"
                />
                <Input
                  id="amount"
                  label="Amount"
                  name="amount"
                  variant="bordered"
                />
                <Select
                  id="category"
                  label="Select a category"
                  name="category"
                  variant="bordered"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  id="account"
                  label="Select an account"
                  name="account"
                  variant="bordered"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  id="label"
                  label="Label"
                  name="label"
                  variant="bordered"
                />
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
      {/* <form action={addAccount} className="flex flex-col gap-2">
        <Input id="account-name" label="Account Name" name="account-name" />
        <Button type="submit">Add Account</Button>
      </form> */}
    </>
  );
}
