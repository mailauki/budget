"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";
import { Goal } from "@/types";
import TotalProgress from "@/components/goals/total-progress";
import GoalsSummary from "@/components/goals/summary";
import Content from "@/components/layout/content";
import Aside from "@/components/layout/aside";
import GoalsList from "@/components/goals/list";
import { heading } from "@/components/primitives";
import FormModal from "@/components/modal";
import GoalForm from "@/components/goals/form";

export default function RealtimeGoals({
  serverGoals,
}: {
  serverGoals: Goal[];
}) {
  const supabase = createClient();

  const [goals, setGoals] = React.useState(serverGoals);

  React.useEffect(() => {
    setGoals(serverGoals);
  }, [serverGoals]);

  React.useEffect(() => {
    const channel = supabase
      .channel("realtime-goals")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "goals",
        },
        (payload) => {
          const eventType = payload.eventType;

          if (eventType === "INSERT") {
            setGoals((goals: Goal[]) => [...goals, payload.new as Goal]);
          }

          if (eventType === "UPDATE") {
            setGoals(
              goals.map((goal) =>
                goal.id === payload.new.id ? (payload.new as Goal) : goal,
              ),
            );
          }

          if (eventType === "DELETE") {
            setGoals(
              goals.filter((goal) => goal.id !== payload.old.id ?? goal),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverGoals]);

  if (!goals || goals.length === 0) {
    return <GoalsSummary />;
  }

  return (
    <>
      {/* sm - mobile */}
      <div className="col-span-full flex sm:hidden flex-col gap-3">
        <div className="h-14 flex items-center justify-between mb-1">
          <h2 className={heading()}>Saving Goals</h2>
          <FormModal form={<GoalForm />} type="new" variant="goal" />
        </div>
        <TotalProgress goals={goals} />
        <GoalsList
          goals={goals.sort((a, b) => {
            if (a.priority === 0) return 1;
            if (b.priority === 0) return -1;

            return a.priority - b.priority;
          })}
        />
      </div>

      {/* md & lg - desktop */}
      <Content>
        <div className="h-14 flex items-center justify-between mb-1">
          <h2 className={heading()}>Saving Goals</h2>
          <FormModal form={<GoalForm />} type="new" variant="goal" />
        </div>
        <GoalsList
          goals={goals.sort((a, b) => {
            if (a.priority === 0) return 1;
            if (b.priority === 0) return -1;

            return a.priority - b.priority;
          })}
        />
      </Content>
      <Aside>
        <TotalProgress goals={goals} />
        <GoalsSummary goals={goals} />
      </Aside>
    </>
  );
}
