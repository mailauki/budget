"use client";

import React from "react";
import moment from "moment";

import { Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import BudgetsList from "@/components/budget/list";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import Header from "@/components/layout/header";
import LeftToSpend from "@/components/budget/left-to-spend";
import AllocationSummary from "@/components/budget/allocation";
import CashFlowSummary from "@/components/budget/cash-flow";
import NeedsWants from "@/components/budget/50-30-20";
import BudgetExpenses from "@/components/budget/expenses-list";
import DateSelector from "@/components/date/date-selector";

export default function Budgets({
  serverBudgets,
  serverTransactions,
}: {
  serverBudgets: Budget[];
  serverTransactions: Transaction[];
}) {
  const supabase = createClient();

  const [budgets, setBudgets] = React.useState(serverBudgets);
  const [transactions, setTransactions] = React.useState(serverTransactions);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
  );

  React.useEffect(() => {
    setBudgets(serverBudgets);
  }, [serverBudgets]);

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
    setTransactions(serverTransactions);
  }, [serverTransactions]);

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

  function handleChangeDate(date: string) {
    setSelectedDate(date);
  }

  return (
    <>
      <Header>
        <DateSelector
          changeDate={handleChangeDate}
          selectedDate={selectedDate}
          title="Budgets"
        />
      </Header>
      <Aside>
        <div className="flex sm:hidden flex-col gap-4">
          <LeftToSpend
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <AllocationSummary
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div className="hidden sm:flex flex-col gap-4">
          <LeftToSpend
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <AllocationSummary
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <BudgetExpenses
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </Aside>
      <Content>
        <div className="flex flex-col gap-4">
          <CashFlowSummary
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <NeedsWants
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <BudgetsList
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <div className="flex sm:hidden flex-col gap-4">
            <BudgetExpenses
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
        </div>
      </Content>
    </>
  );
}
