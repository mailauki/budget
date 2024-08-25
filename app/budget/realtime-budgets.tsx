"use client";

import React from "react";

import BudgetList from "./list";

import { Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";

export default function RealtimeBudgets({
  serverBudgets,
  serverTransactions,
}: {
  serverBudgets: Budget[];
  serverTransactions: Transaction[];
}) {
  const supabase = createClient();

  const [budgets, setBudgets] = React.useState(serverBudgets);
  const [transactions, setTransactions] = React.useState(serverTransactions);

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

  // return <pre>{JSON.stringify(budgets, null, 2)}</pre>;
  return <BudgetList budgets={budgets} transactions={transactions} />;
}
