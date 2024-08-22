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

import { addAccount } from "../db/actions";

import { categories } from "@/utils/helpers";

export default function NewAccountForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button fullWidth variant="ghost" onPress={onOpen}>
        Add account
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent action={addAccount} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new account
              </ModalHeader>
              <ModalBody>
                <Input
                  id="account-name"
                  label="Account name"
                  name="account-name"
                  variant="bordered"
                />
                <DatePicker
                  id="date"
                  label="Date"
                  name="date"
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
