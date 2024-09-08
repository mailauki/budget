import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { heading } from "../primitives";

import { Goal } from "@/types";
import { getProgressTotal } from "@/utils/helpers";
import { useCurrencyFormatter } from "@/utils/formatters";

export default function TotalProgress({
  goals,
  children,
}: {
  goals: Goal[];
  children?: React.ReactNode;
}) {
  const currencyFormatter = useCurrencyFormatter();

  return (
    <>
      <Card className="py-4" radius="sm">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="flex flex-col">
            <h2 className={heading({ variant: "secondary" })}>Total savings</h2>
            <p className={heading({ variant: "title" })}>
              {currencyFormatter.format(getProgressTotal({ goals }))}
            </p>
          </div>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
}
