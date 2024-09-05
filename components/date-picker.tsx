"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import moment from "moment";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import React from "react";
import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";

import { getDatesBetween } from "@/utils/helpers";

export default function DatePicker({ selectedDate }: { selectedDate: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [date, setDate] = React.useState<string>(`${selectedDate}-01`);

  let startDate = `${moment().subtract(2, "years").format("YYYY-MM-DD")}`;
  let endDate = `${moment().add(2, "years").format("YYYY-MM-DD")}`;

  let dateRange = getDatesBetween(startDate, endDate);

  function increment() {
    if (date < endDate)
      setDate(moment(date).add(1, "months").format("YYYY-MM-DD"));
  }

  function decrement() {
    if (date > startDate)
      setDate(moment(date).subtract(1, "months").format("YYYY-MM-DD"));
  }

  return (
    <>
      <ButtonGroup className="w-[200px]" radius="sm" variant="ghost">
        <Button isIconOnly onPress={decrement}>
          <BsChevronLeft />
        </Button>
        <Popover
          showArrow
          isOpen={isOpen}
          offset={10}
          placement="bottom"
          radius="sm"
          onOpenChange={onOpenChange}
        >
          <PopoverTrigger>
            <Button className="flex-1">
              {moment(date).format("MMM, YYYY")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="h-[440px] overflow-y-auto w-full p-2">
              <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                {dateRange.map((item) => (
                  <ListboxItem key={moment(item).format("YYYY-MM")}>
                    {moment(item).format("MMM, YYYY")}
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          </PopoverContent>
        </Popover>
        <Button isIconOnly onPress={increment}>
          <BsChevronRight />
        </Button>
      </ButtonGroup>
    </>
  );
}
