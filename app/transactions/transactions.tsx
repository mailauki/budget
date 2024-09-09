"use client";

import React from "react";
import moment from "moment";

import { Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import TransactionsList from "@/components/transactions/list";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import DateSelector from "@/components/date/date-selector";
import SpendingLimit from "@/components/transactions/spending-limit";
import TransactionModal from "@/components/transactions/modal";
import { heading } from "@/components/primitives";
import ExpenseChart from "@/components/charts/expenses";

export default function RealtimeTransactions({
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
    setTransactions(serverTransactions);
  }, [serverTransactions]);

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

  function handleChangeDate(date: string) {
    setSelectedDate(date);
  }

  return (
    <>
      <Aside>
        <div className="flex flex-col gap-4">
          <div className="flex sm:hidden">
            <DateSelector
              changeDate={handleChangeDate}
              endContent={<TransactionModal />}
              selectedDate={selectedDate}
            />
          </div>
          <SpendingLimit
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          <ExpenseChart
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </div>
      </Aside>
      <Content>
        <div className="hidden sm:flex">
          <DateSelector
            changeDate={handleChangeDate}
            endContent={<TransactionModal />}
            selectedDate={selectedDate}
            title="Transactions"
          />
        </div>
        <div className="flex sm:hidden">
          <h2 className={heading()}>Transactions</h2>
        </div>
        <TransactionsList
          selectedDate={selectedDate}
          transactions={transactions}
        />
      </Content>
    </>
  );
}
