"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";
import { Goal } from "@/types";
import GoalCard from "@/components/goals/card";
import TotalProgress from "@/components/goals/total-progress";
import GoalsSummary from "@/components/goals/summary";

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
      <div className="grid grid-cols-12 gap-3">
        <TotalProgress goals={goals} />
        {goals
          .sort((a, b) => {
            if (a.priority === 0) return 1;
            if (b.priority === 0) return -1;

            return a.priority - b.priority;
          })
          .map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        <GoalsSummary goals={goals} />
      </div>
    </>
  );
}
