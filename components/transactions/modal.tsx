"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";
import React from "react";

import TransactionForm from "./form";

import { editTransaction } from "@/db/actions";

export default function TransactionModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="hidden sm:flex bg-foreground text-background pl-5"
        endContent={<BsPlus size={18} />}
        radius="full"
        size="sm"
        onPress={onOpen}
      >
        Add New
      </Button>
      <div className="fixed sm:hidden bottom-0 right-0 m-6 z-50">
        <Tooltip content="Add New">
          <Button
            isIconOnly
            className="bg-foreground text-background"
            radius="full"
            size="lg"
            variant="shadow"
            onPress={onOpen}
          >
            <BsPlus size={20} />
          </Button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} radius="sm" onOpenChange={onOpenChange}>
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
                <Button radius="sm" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-foreground text-background"
                  color="primary"
                  radius="sm"
                  type="submit"
                  onPress={onClose}
                >
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
