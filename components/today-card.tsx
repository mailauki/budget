"use client";

import moment from "moment";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Calendar,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const today = {
  weekday: moment().format("dddd"),
  year: moment().format("yyyy"),
  month: moment().format("MMMM"),
  date: moment().format("DD"),
};

export default function TodayCard() {
  return (
    <Card className="w-full" radius="sm">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-[4rem]">{today.date}</p>
          <p className="text-small text-default-500">
            {today.month} {today.year}
          </p>
          <p className="text-small text-default-500">{today.weekday}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex gap-3">
        <Calendar
          aria-label="Date (Uncontrolled)"
          defaultValue={parseDate(moment().format("YYYY-MM-DD"))}
        />
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
