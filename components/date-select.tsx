import { Button } from "@nextui-org/button";
import moment from "moment";
import { Card } from "@nextui-org/card";

import { getDatesBetween } from "@/utils/helpers";

export default function DateSelector({
  selectedDate,
  changeDate,
}: {
  selectedDate: string;
  changeDate: (date: string) => void;
}) {
  let startDate = `${moment().subtract(2, "years").format("YYYY-MM-DD")}`;
  let endDate = `${moment().add(2, "years").format("YYYY-MM-DD")}`;

  let dateRange = getDatesBetween(startDate, endDate);

  return (
    <>
      <Card radius="sm" shadow="sm">
        <div className="flex flex-row gap-4 p-4 items-center overflow-x-auto  overscroll-auto scroll-smooth snap-normal snap-x scrollbar-hidden focus:scroll-auto">
          {dateRange.map((date: string) => (
            <Button
              key={date}
              className={`flex-col items-center justify-center gap-1 min-w-[80px] min-h-[70px] snap-center will-change-scroll ${
                `${moment(date).format("YYYY-MM")}` == selectedDate &&
                "active focus"
              }`}
              color={
                `${moment(date).format("YYYY-MM")}` == selectedDate
                  ? "primary"
                  : "default"
              }
              id={`${moment(date).format("YYYY-MM")}`}
              radius="sm"
              size="lg"
              variant={
                `${moment(date).format("YYYY-MM")}` == selectedDate
                  ? "solid"
                  : "ghost"
              }
              onClick={() => changeDate(`${moment(date).format("YYYY-MM")}`)}
            >
              <span className="text-small uppercase">
                {moment(date).format("MMM")}
              </span>
              <span
                className={`text-tiny ${`${moment(date).format("YYYY-MM")}` == selectedDate ? "text-forground" : "text-default-500"}`}
              >
                {moment(date).format("YYYY")}
              </span>
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
}
