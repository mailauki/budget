import {
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Progress,
} from "@nextui-org/react";
import { useNumberFormatter } from "@react-aria/i18n";

import { Goal } from "@/types";

export default function GoalCard({ goal }: { goal: Goal }) {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    trailingZeroDisplay: "stripIfInteger",
    roundingPriority: "auto",
  });
  const progress = (100 * goal.current_amount) / goal.goal_amount;

  return (
    <Card isFooterBlurred className="w-full h-[300px]">
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
            radius="lg"
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
          radius="lg"
          size="lg"
          variant="flat"
        >
          {formatter.format(goal.current_amount)} /{" "}
          {formatter.format(goal.goal_amount)}
        </Chip>
      </CardFooter>
    </Card>
  );
}
