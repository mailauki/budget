"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";
import React from "react";

import TransactionForm from "./transaction-form";

import { editTransaction } from "@/db/actions";

export default function TransactionModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        <ModalContent action={editTransaction} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new transaction
              </ModalHeader>
              <ModalBody>
                <TransactionForm />
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
