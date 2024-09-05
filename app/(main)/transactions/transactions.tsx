"use client";

import React from "react";

import { Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import TransactionsList from "@/components/transactions/list";
import ExpenseSummary from "@/components/transactions/expense-summary";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";

export default function RealtimeTransactions({
  serverTransactions,
}: {
  serverTransactions: Transaction[];
}) {
  const supabase = createClient();

  const [transactions, setTransactions] = React.useState(serverTransactions);

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

  return (
    <>
      <Aside>
        <ExpenseSummary transactions={transactions} />
      </Aside>
      <Content>
        <TransactionsList transactions={transactions} />
      </Content>
    </>
  );
}
