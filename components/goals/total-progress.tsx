import { Card, CardFooter, CardHeader, Progress } from "@nextui-org/react";

import { Goal } from "@/types";
import { getProgressTotal } from "@/utils/helpers";

export default function TotalProgress({ goals }: { goals: Goal[] }) {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex-col items-start">
        <p className="text-tiny text-default-400 uppercase font-bold">
          Total Progress
        </p>
        <h4 className="font-medium text-xl">
          {Math.round(getProgressTotal({ goals }))}%
        </h4>
      </CardHeader>
      <CardFooter>
        <Progress size="lg" value={getProgressTotal({ goals })} />
      </CardFooter>
    </Card>
  );
}
