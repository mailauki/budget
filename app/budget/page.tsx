import { Button } from "@nextui-org/button";
import { BsCalendar } from "react-icons/bs";

import Budgets from "./budgets";

import { title } from "@/components/primitives";

export default function BudgetPage() {
  return (
    <div className="w-full flex flex-col gap-4 my-3">
      <div className="flex items-baseline justify-between">
        <h1 className={title()}>Budget</h1>
        <Button isIconOnly aria-label="Open calendar options" variant="light">
          <BsCalendar />
        </Button>
      </div>
      <Budgets />
    </div>
  );
}
