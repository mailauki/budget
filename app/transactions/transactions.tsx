"use client";

import React from "react";
import moment from "moment";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/client";
import TransactionsList from "@/components/transactions/list";
import ExpenseSummary from "@/components/transactions/expense-summary";
import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import { heading } from "@/components/primitives";
import DatePicker from "@/components/date-picker";
import TransactionModal from "@/components/transactions/modal";
import DateSelector from "@/components/date-select";
import SpendingLimit from "@/components/transactions/spending-limit";

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

  function handleOpenCalendar() {
    calendarOpen.has("date-selector")
      ? setCalendarOpen(new Set([]))
      : setCalendarOpen(new Set(["date-selector"]));
  }

  return (
    <>
      {/* <Header>
        <div className="flex-1">
          <h1 className={title()}>Transactions</h1>
        </div>
        <DatePicker
          changeDate={handleChangeDate}
          handleOpenCalendar={handleOpenCalendar}
          selectedDate={selectedDate}
        />
        <TransactionModal />
        <Accordion className="px-0" selectedKeys={calendarOpen}>
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
      </Header> */}
      <Aside>
        <div className="flex flex-col gap-4">
          <SpendingLimit
            budgets={budgets}
            selectedDate={selectedDate}
            transactions={transactions}
          />
          {/* <Spent selectedDate={selectedDate} transactions={transactions} /> */}
          <ExpenseSummary transactions={transactions} />
        </div>
      </Aside>
      <Content>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex-1">
            <h2 className={heading()}>Transactions</h2>
          </div>
          <DatePicker
            changeDate={handleChangeDate}
            handleOpenCalendar={handleOpenCalendar}
            selectedDate={selectedDate}
          />
          <TransactionModal />
          <Accordion className="px-0" selectedKeys={calendarOpen}>
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
        </div>
        <TransactionsList
          selectedDate={selectedDate}
          transactions={transactions}
        />
      </Content>
    </>
  );
}
