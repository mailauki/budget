"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import moment from "moment";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import React from "react";

export default function DatePicker({
  selectedDate,
  changeDate,
  handleOpenCalendar,
}: {
  selectedDate: string;
  changeDate: (date: string) => void;
  handleOpenCalendar: () => void;
}) {
  const [date, setDate] = React.useState<string>(`${selectedDate}-01`);

  let startDate = `${moment().subtract(2, "years").format("YYYY-MM-DD")}`;
  let endDate = `${moment().add(2, "years").format("YYYY-MM-DD")}`;

  function increment() {
    if (date < endDate)
      setDate(moment(date).add(1, "months").format("YYYY-MM-DD"));
  }

  function decrement() {
    if (date > startDate)
      setDate(moment(date).subtract(1, "months").format("YYYY-MM-DD"));
  }

  React.useEffect(() => {
    setDate(`${selectedDate}-01`);
  }, [selectedDate]);

  React.useEffect(() => {
    changeDate(moment(date).format("YYYY-MM"));
  }, [date]);

  return (
    <>
      <ButtonGroup
        className="w-full sm:w-[200px]"
        radius="full"
        size="sm"
        variant="solid"
      >
        <Button
          isIconOnly
          className="bg-foreground text-background"
          onPress={decrement}
        >
          <BsChevronLeft />
        </Button>
        <Button
          className="flex-1 bg-foreground text-background"
          onPress={handleOpenCalendar}
        >
          {moment(date).format("MMM, YYYY")}
        </Button>
        <Button
          isIconOnly
          className="bg-foreground text-background"
          onPress={increment}
        >
          <BsChevronRight />
        </Button>
      </ButtonGroup>
    </>
  );
}
