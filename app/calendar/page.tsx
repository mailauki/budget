"use client";

import { Calendar, Card, CardHeader } from "@nextui-org/react";
import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import moment from "moment";

import Aside from "@/components/layout/aside";
import Content from "@/components/layout/content";
import { heading } from "@/components/primitives";

export default function CalendarPage() {
  const currentDate = today(getLocalTimeZone());
  const [selectedDate, setSelectedDate] = React.useState(currentDate);
  const date = {
    weekday: moment(currentDate.toString()).format("dddd"),
    year: moment(currentDate.toString()).format("yyyy"),
    month: moment(currentDate.toString()).format("MMMM"),
    day: moment(currentDate.toString()).format("DD"),
  };

  return (
    <>
      <Aside>
        <div className="flex flex-col items-center gap-3">
          <Card
            fullWidth
            isPressable
            className="py-4 text-left"
            radius="sm"
            onPress={() => setSelectedDate(currentDate)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex flex-col">
                <h2 className={heading({ variant: "title" })}>{date.day}</h2>
                <p className={heading({ variant: "tertiary" })}>
                  {date.month} {date.year}
                </p>
                <p className={heading({ variant: "secondary" })}>
                  {date.weekday}
                </p>
              </div>
            </CardHeader>
          </Card>
          <Calendar
            aria-label="Calendar"
            className="rounded-small"
            classNames={{
              base: "w-full flex items-center justify-center pb-3 overflow-hidden",
              gridHeaderCell: "uppercase",
            }}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      </Aside>
      <Content>
        <p>{selectedDate.toString()}</p>
      </Content>
    </>
  );
}
