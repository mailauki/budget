"use client";

import React from "react";
import moment from "moment";

import { Budget, Goal, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import TransactionsList from "@/components/transactions/list";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import DateSelector from "@/components/date/date-selector";
import { heading } from "@/components/primitives";
import ExpenseChart from "@/components/charts/expenses";
import ThisMonth from "@/components/dashboard/this-month-card";
import TotalBalanceChart from "@/components/charts/total-balance";
import GoalsList from "@/components/dashboard/goals";

export default function RealtimeDashboard({
  serverBudgets,
  serverTransactions,
  serverGoals,
}: {
  serverBudgets: Budget[];
  serverTransactions: Transaction[];
  serverGoals: Goal[];
}) {
  const supabase = createClient();

  const [budgets, setBudgets] = React.useState(serverBudgets);
  const [transactions, setTransactions] = React.useState(serverTransactions);
  const [goals, setGoals] = React.useState(serverGoals);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
  );

  React.useEffect(() => {
    setBudgets(serverBudgets);
  }, [serverBudgets]);

  React.useEffect(() => {
    setTransactions(serverTransactions);
  }, [serverTransactions]);

  React.useEffect(() => {
    setGoals(serverGoals);
  }, [serverGoals]);

  React.useEffect(() => {
    const channel = supabase
      .channel("realtime-budgets")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "budgets" },
        (payload) =>
          setBudgets((budgets: Budget[]) => [
            ...budgets,
            payload.new as Budget,
          ]),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverBudgets]);

  React.useEffect(() => {
    const channel = supabase
      .channel("realtime-transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          const eventType = payload.eventType;

          if (eventType === "INSERT") {
            setTransactions((transactions: Transaction[]) => [
              ...transactions,
              payload.new as Transaction,
            ]);
          }

          if (eventType === "UPDATE") {
            setTransactions(
              transactions.map((ta) =>
                ta.id === payload.new.id ? (payload.new as Transaction) : ta,
              ),
            );
          }

          if (eventType === "DELETE") {
            setTransactions(
              transactions.filter((ta) => ta.id !== payload.old.id ?? ta),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverTransactions]);

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

  function handleChangeDate(date: string) {
    setSelectedDate(date);
  }

  return (
    <>
      {/* sm - mobile */}
      <div className="col-span-full flex sm:hidden flex-col gap-3">
        <div className="min-h-14 sticky top-14 z-40">
          <DateSelector
            changeDate={handleChangeDate}
            selectedDate={selectedDate}
          />
        </div>
        <div>
          <div className="h-14 flex items-center mb-1">
            <h2 className={heading()}>Overview</h2>
          </div>
          <div className="flex gap-3 justify-between py-2 h-32">
            <ThisMonth
              category="Income"
              selectedDate={selectedDate}
              transactions={transactions}
            />
            <ThisMonth
              category="Expenses"
              selectedDate={selectedDate}
              transactions={transactions}
            />
            <ThisMonth
              category="Savings"
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
        </div>
        <div>
          <TotalBalanceChart
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div>
          <ExpenseChart
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div>
          <GoalsList
            goals={goals.sort((a, b) => {
              if (a.priority === 0) return 1;
              if (b.priority === 0) return -1;

              return a.priority - b.priority;
            })}
          />
        </div>
        <div>
          <h2 className={heading()}>Transactions</h2>
          <TransactionsList
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </div>

      {/* md & lg - desktop */}
      <Content>
        <div>
          <div className="h-14 flex items-center mb-1">
            <h2 className={heading()}>Overview</h2>
          </div>
          <div className="flex gap-3 justify-between py-2 h-32">
            <ThisMonth
              category="Income"
              selectedDate={selectedDate}
              transactions={transactions}
            />
            <ThisMonth
              category="Expenses"
              selectedDate={selectedDate}
              transactions={transactions}
            />
            <ThisMonth
              category="Savings"
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
        </div>
        <div>
          <TotalBalanceChart
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div>
          <GoalsList
            goals={goals.sort((a, b) => {
              if (a.priority === 0) return 1;
              if (b.priority === 0) return -1;

              return a.priority - b.priority;
            })}
          />
        </div>
      </Content>
      <Aside>
        <div className="min-h-14 sticky top-14 z-40">
          <DateSelector
            changeDate={handleChangeDate}
            selectedDate={selectedDate}
          />
        </div>
        <div>
          <ExpenseChart
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div>
          <h2 className={heading()}>Transactions</h2>
          <TransactionsList
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </Aside>
    </>
  );
}
