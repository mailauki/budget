import { Listbox, Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { heading } from "../primitives";

import GoalCard from "./card";

import { Goal } from "@/types";

export default function GoalsList({ goals }: { goals: Goal[] }) {
  const path = usePathname();
  const complete = goals.filter(
    (goal) => goal.current_amount >= goal.goal_amount,
  );
  const active = goals.filter((goal) => goal.current_amount < goal.goal_amount);

  return (
    <>
      {path === "/goals" ? (
        <div className="w-full relative">
          <Tabs aria-label="Options" radius="full">
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
            <Tab key="archive" title="Archive">
              <Listbox emptyContent="No goals archived yet">{[]}</Listbox>
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
        </div>
      ) : (
        <div className="w-full">
          <h2 className={heading()}>Goals</h2>
          {active.length === 0 ? (
            <Listbox emptyContent="No goals added yet">{[]}</Listbox>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-3 mt-3">
              {active.map((goal) => (
                <GoalCard key={goal.id} goal={goal} variant="sm" />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
