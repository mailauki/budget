import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useNumberFormatter } from "@react-aria/i18n";
import React from "react";

import GoalForm from "./form";

import { Goal } from "@/types";
import { editGoal } from "@/db/actions";

export default function GoalCard({ goal }: { goal: Goal }) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0,
    // trailingZeroDisplay: "stripIfInteger",
    // roundingPriority: "auto",
  });
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
        isFooterBlurred
        isPressable
        className="w-full h-[300px]"
        onPress={() => handleOpen(goal)}
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Goal</p>
          <h4 className="text-white/90 font-medium text-xl">{goal.name}</h4>
        </CardHeader>
        <div className="w-full h-full bg-gradient-to-tr from-pink-500 to-yellow-500" />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10">
          <div className="flex flex-grow gap-2 items-center">
            <Chip
              className="text-md text-white bg-black/20"
              color="default"
              size="lg"
              variant="flat"
            >
              {progress}%
            </Chip>
            <Progress
              className="w-10/12"
              classNames={{ indicator: "bg-foreground" }}
              color="default"
              value={progress}
            />
          </div>
          <Chip
            className="text-tiny text-white bg-black/20"
            color="default"
            size="md"
            variant="flat"
          >
            {formatter.format(goal.current_amount)} /{" "}
            {formatter.format(goal.goal_amount)}
          </Chip>
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
