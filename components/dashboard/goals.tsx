import { Listbox } from "@nextui-org/react";

import { heading } from "../primitives";

import GoalCard from "./goal-card";

import { Goal } from "@/types";

export default function GoalsList({ goals }: { goals: Goal[] }) {
  const active = goals.filter((goal) => goal.current_amount < goal.goal_amount);

  return (
    <div className="w-full">
      <h2 className={heading()}>Goals</h2>
      {active.length === 0 ? (
        <Listbox emptyContent="No goals added yet">{[]}</Listbox>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-3 mt-3">
          {active.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
}
