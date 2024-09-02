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

import GoalForm from "./form";

import { editGoal } from "@/db/actions";

export default function GoalModal() {
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
      <Modal isOpen={isOpen} radius="sm" onOpenChange={onOpenChange}>
        <ModalContent action={editGoal} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new goal
              </ModalHeader>
              <ModalBody>
                <GoalForm />
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
