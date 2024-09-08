import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { BsPencil, BsPlus } from "react-icons/bs";

import { heading } from "../primitives";

import GoalForm from "./form";

import { Goal } from "@/types";
import { editGoal, updateGoal } from "@/db/actions";
import { useCurrencyFormatter } from "@/utils/formatters";
import { getGoalIcon } from "@/utils/icons";

export default function GoalCard({ goal }: { goal: Goal }) {
  const currencyFormatter = useCurrencyFormatter();
  const progress = (100 * goal.current_amount) / goal.goal_amount;

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openItem, setOpenItem] = React.useState<Goal>();

  function handleOpen(item: Goal) {
    setOpenItem(item);
    onOpen();
  }

  return (
    <>
      <Card radius="sm">
        <CardHeader className="items-start justify-between">
          <div className="flex gap-5">
            <Avatar icon={getGoalIcon(goal.name)} radius="full" size="md" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className={heading()}>{goal.name}</h4>
              <p className={heading({ variant: "tertiary" })}>
                Monthly contribution:{" "}
                {currencyFormatter.format(goal.contribution)}
              </p>
            </div>
          </div>
          <p className={heading({ variant: "subtitle" })}>
            Goal {goal.priority > 0 && goal.priority}
          </p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className={heading({ variant: "secondary" })}>
              {currencyFormatter.format(goal.current_amount)}
            </p>
            <p className={heading({ variant: "secondary" })}>
              Target {currencyFormatter.format(goal.goal_amount)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress} />
            <span className={heading({ variant: "subtitle" })}>
              {Math.round((100 * goal.current_amount) / goal.goal_amount) || 0}%
            </span>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button
            radius="full"
            size="md"
            startContent={<BsPencil />}
            variant="light"
            onPress={() => handleOpen(goal)}
          >
            Edit
          </Button>
          <Tooltip content="Quick Add">
            <Button
              className="pr-5"
              radius="full"
              size="md"
              startContent={<BsPlus size={20} />}
              variant="solid"
              onPress={() =>
                updateGoal({
                  goal: {
                    ...goal,
                    current_amount: goal.current_amount + goal.contribution,
                  },
                })
              }
            >
              {currencyFormatter.format(goal.contribution)}
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        radius="sm"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent action={editGoal} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit goal
              </ModalHeader>
              <ModalBody>
                <GoalForm item={openItem} />
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
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
