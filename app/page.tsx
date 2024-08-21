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
  Button,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const today = {
  weekday: moment().format("dddd"),
  year: moment().format("yyyy"),
  month: moment().format("MMMM"),
  date: moment().format("DD"),
};

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/* <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}
      <div className="inline-block max-w-lg text-center justify-center">
        <h1>Hello World!</h1>
        <Button
          showAnchorIcon
          as={Link}
          color="primary"
          href="/login"
          variant="solid"
        >
          Login
        </Button>
      </div>
      <Card className="max-w-[400px]">
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
    </section>
  );
}
