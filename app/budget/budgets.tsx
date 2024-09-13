"use client";

import React from "react";
import moment from "moment";

import { Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import BudgetsList from "@/components/budget/list";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import LeftToSpend from "@/components/budget/left-to-spend";
import CashFlowSummary from "@/components/budget/cash-flow";
import BudgetExpenses from "@/components/budget/expenses-list";
import DateSelector from "@/components/date/date-selector";
import ExpenseChart from "@/components/charts/expenses";
import { heading } from "@/components/primitives";

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
      {/* sm - mobile */}
      <div className="col-span-full sm:hidden flex flex-col gap-3">
        <div className="min-h-14 sticky top-14 z-40">
          <DateSelector
            changeDate={handleChangeDate}
            selectedDate={selectedDate}
          />
        </div>
        <div>
          <LeftToSpend
            budgets={budgets}
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
          <div className="h-14 flex items-center mb-1">
            <h2 className={heading()}>Budgets</h2>
          </div>
          <div>
            <CashFlowSummary
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
          <div>
            <BudgetsList
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
          <div>
            <BudgetExpenses
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
        </div>
      </div>

      {/* md & lg - desktop */}
      <Content>
        <div>
          <div className="h-14 flex items-center mb-3">
            <h2 className={heading()}>Budgets</h2>
          </div>
          <div>
            <BudgetsList
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
          <div>
            <BudgetExpenses
              budgets={budgets}
              selectedDate={selectedDate}
              transactions={transactions}
            />
          </div>
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
          <LeftToSpend
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
        <div>
          <CashFlowSummary
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </Aside>
    </>
  );
}
