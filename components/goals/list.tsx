import { Listbox, Tab, Tabs } from "@nextui-org/react";

import GoalCard from "./card";
import GoalModal from "./modal";

import { Goal } from "@/types";

export default function GoalsList({ goals }: { goals: Goal[] }) {
  const complete = goals.filter(
    (goal) => goal.current_amount >= goal.goal_amount,
  );
  const active = goals.filter((goal) => goal.current_amount < goal.goal_amount);

  return (
    <div className="w-full relative">
      <Tabs aria-label="Options">
        <Tab key="active" title="Active">
          {active.length === 0 ? (
            <Listbox emptyContent="No goals added yet">{[]}</Listbox>
          ) : (
            <div className="flex flex-col gap-3">
              {active.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </Tab>
        <Tab key="complete" title="Complete">
          {complete.length === 0 ? (
            <Listbox emptyContent="No goals completed yet">{[]}</Listbox>
          ) : (
            <div className="flex flex-col gap-3">
              {complete.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </Tab>
      </Tabs>
      <div className="absolute top-0 right-0">
        <GoalModal />
      </div>
    </div>
  );
}
