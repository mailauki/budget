import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

import { heading } from "../primitives";

import DatePicker from "./date-picker";
import DateSelection from "./date-selection";

export default function DateSelector({
  title,
  endContent,
  changeDate,
  selectedDate,
}: {
  title?: string;
  endContent?: React.ReactNode;
  changeDate: (date: string) => void;
  selectedDate: string;
}) {
  const [calendarOpen, setCalendarOpen] = React.useState(new Set([""]));

  React.useEffect(() => {
    let element = document.getElementById(selectedDate);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [selectedDate, calendarOpen]);

  function handleOpenCalendar() {
    calendarOpen.has("date-selector")
      ? setCalendarOpen(new Set([]))
      : setCalendarOpen(new Set(["date-selector"]));
  }

  return (
    <>
      <div className="flex items-center justify-between min-h-14">
        <div className="hidden sm:flex flex-1">
          <h2 className={heading()}>{title}</h2>
        </div>
        <DatePicker
          changeDate={changeDate}
          handleOpenCalendar={handleOpenCalendar}
          selectedDate={selectedDate}
        />
        {endContent}
      </div>
      <Accordion className="px-0" selectedKeys={calendarOpen}>
        <AccordionItem
          key="date-selector"
          hideIndicator
          aria-label="Open calendar options"
          classNames={{ trigger: "hidden", content: "mt-1" }}
        >
          <DateSelection changeDate={changeDate} selectedDate={selectedDate} />
        </AccordionItem>
      </Accordion>
    </>
  );
}
