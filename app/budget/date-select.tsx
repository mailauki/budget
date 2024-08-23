/* eslint-disable no-console */
"use client";

import { Button } from "@nextui-org/button";
import moment from "moment";

import { getDatesBetween } from "@/utils/helpers";

export default function DateSelector() {
  let startDate = `${moment(moment().subtract(2, "years").calendar()).format("YYYY-MM-DD")}`;
  let endDate = `${moment(moment().add(2, "years").calendar()).format("YYYY-MM-DD")}`;

  let dateRange = getDatesBetween(startDate, endDate);

  return (
    <>
      <div className="flex flex-row gap-4 items-center overflow-x-auto">
        {dateRange.map((date: string) => (
          <Button
            key={date}
            className="flex-col items-center justify-center gap-1 min-w-[80px] min-h-[70px]"
            radius="sm"
            size="lg"
            variant="ghost"
            onClick={() => alert(`${moment(date).format("YYYY-MM")}-01`)}
          >
            <span className="text-small uppercase">
              {moment(date).format("MMM")}
            </span>
            <span className="text-tiny text-default-500">
              {moment(date).format("YYYY")}
            </span>
          </Button>
        ))}
      </div>
    </>
  );
}
