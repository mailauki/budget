import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { BsPencil, BsPlus } from "react-icons/bs";

import GoalForm from "./form";

import { Goal } from "@/types";
import { editGoal } from "@/db/actions";
import { useCurrencyFormatter } from "@/utils/formatters";

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
      <Card
        // isPressable
        className="w-full col-span-12 md:col-span-6 [&:last-child]:col-span-full"
        onPress={() => handleOpen(goal)}
      >
        <CardHeader className="items-start justify-between">
          <div className="flex flex-col items-start justify-start">
            <p className="text-tiny text-default-400 uppercase font-bold">
              Goal {goal.priority > 0 && goal.priority}
            </p>
            <h4 className="text-forground font-medium text-xl">{goal.name}</h4>
          </div>
          <Button
            isIconOnly
            radius="full"
            size="lg"
            variant="ghost"
            onPress={() => handleOpen(goal)}
          >
            <BsPencil />
          </Button>
        </CardHeader>
        <CardBody className="flex flex-row items-center justify-between gap-2">
          {/* <div className="w-full flex justify-between">
            <p className="text-default-500">Left to save</p>
            <Divider orientation="vertical" />
            <p>
              {currencyFormatter.format(
                goal.goal_amount - goal.current_amount || 0,
              )}
            </p>
          </div> */}
          <div className="flex items-center justify-center flex-1">
            <CircularProgress
              aria-label="goal progress"
              classNames={{
                svg: "w-52 h-52",
                value: "text-3xl text-default-700",
              }}
              color="default"
              showValueLabel={true}
              size="lg"
              value={progress}
            />
          </div>

          <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-col items-start justify-start">
              <p className="text-tiny text-default-400 uppercase font-bold">
                Monthly contribution
              </p>
              <h4 className="text-forground font-medium">
                {currencyFormatter.format(goal.contribution)}
              </h4>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-tiny text-default-400 uppercase font-bold">
                Left to save
              </p>
              <h4 className="text-forground font-medium">
                {currencyFormatter.format(
                  goal.goal_amount - goal.current_amount || 0,
                )}
              </h4>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-tiny text-default-400 uppercase font-bold">
                Months left
              </p>
              <h4 className="text-forground font-medium">
                {Math.round(
                  (goal.goal_amount - goal.current_amount || 0) /
                    goal.contribution,
                ) === Infinity
                  ? "N/A"
                  : Math.round(
                      (goal.goal_amount - goal.current_amount || 0) /
                        goal.contribution,
                    )}
              </h4>
            </div>
          </div>
        </CardBody>
        <CardFooter className="items-baseline justify-between">
          <Chip
            className="text-tiny ml-2"
            color="default"
            size="md"
            variant="flat"
          >
            {currencyFormatter.format(goal.current_amount)} /{" "}
            {currencyFormatter.format(goal.goal_amount)}
          </Chip>
          <Button
            radius="full"
            size="md"
            startContent={<BsPlus size={20} />}
            variant="ghost"
          >
            {currencyFormatter.format(goal.contribution)}
          </Button>
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
