"use client";

import React from "react";
import moment from "moment";

import { Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import TransactionsList from "@/components/transactions/list";
import ExpenseSummary from "@/components/transactions/expense-summary";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import Header from "@/components/layout/header";
import { title } from "@/components/primitives";
import DatePicker from "@/components/date-picker";
import TransactionModal from "@/components/transactions/modal";

export default function RealtimeTransactions({
  serverTransactions,
}: {
  serverTransactions: Transaction[];
}) {
  const supabase = createClient();

  const [transactions, setTransactions] = React.useState(serverTransactions);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM"),
  );

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
        <div className="flex-1">
          <h1 className={title()}>Transactions</h1>
        </div>
        <DatePicker changeDate={handleChangeDate} selectedDate={selectedDate} />
        <TransactionModal />
      </Header>
      <Aside>
        <ExpenseSummary transactions={transactions} />
      </Aside>
      <Content>
        <TransactionsList transactions={transactions} />
      </Content>
    </>
  );
}
