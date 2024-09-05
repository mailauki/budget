"use client";

import type { Selection } from "@nextui-org/react";

import React from "react";
import moment from "moment";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { BsCalendar } from "react-icons/bs";

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
import DateSelector from "@/components/date-select";

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
  const [calendarOpen, setCalendarOpen] = React.useState(new Set([""]));

  React.useEffect(() => {
    let element = document.getElementById(selectedDate);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [selectedDate, calendarOpen]);

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

  function handleOpenCalendar() {
    calendarOpen.has("date-selector")
      ? setCalendarOpen(new Set([]))
      : setCalendarOpen(new Set(["date-selector"]));
  }

  return (
    <>
      <Header>
        <div className="flex-1">
          <h1 className={title()}>Transactions</h1>
        </div>
        <DatePicker
          changeDate={handleChangeDate}
          handleOpenCalendar={handleOpenCalendar}
          selectedDate={selectedDate}
        />
        <TransactionModal />
        <Accordion selectedKeys={calendarOpen}>
          <AccordionItem
            key="date-selector"
            hideIndicator
            aria-label="Open calendar options"
            classNames={{ trigger: "hidden" }}
          >
            <DateSelector
              changeDate={handleChangeDate}
              selectedDate={selectedDate}
            />
          </AccordionItem>
        </Accordion>
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
