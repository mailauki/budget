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
import React from "react";

import ModalButton from "./modal-button";

import { editGoal, editTransaction } from "@/db/actions";

export default function FormModal({
  form,
  variant,
  type,
  children,
}: {
  form: React.ReactNode;
  variant: "goal" | "transaction";
  type: "new" | "edit";
  children?: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ModalButton onOpen={onOpen}>{children}</ModalButton>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        radius="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form action={variant === "goal" ? editGoal : editTransaction}>
              <ModalHeader className="flex flex-col gap-1">
                {type === "edit" ? "Edit" : "Add new"} {variant}
              </ModalHeader>
              <ModalBody>{form}</ModalBody>
              <ModalFooter>
                <Button radius="full" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-foreground text-background"
                  color="primary"
                  radius="full"
                  type="submit"
                  onPress={onClose}
                >
                  {type === "edit" ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
