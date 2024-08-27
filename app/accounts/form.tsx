"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { addAccount } from "../../db/actions";

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
