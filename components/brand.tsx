"use client";

import { User } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import React, { ReactNode } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import {
  BsAirplane,
  BsBank,
  BsCart2,
  BsCashStack,
  BsCreditCard2Back,
  BsCupHot,
  BsCurrencyDollar,
  BsHeartPulse,
  BsHouse,
  BsMortarboard,
  BsQuestionLg,
} from "react-icons/bs";

export default function Brand({
  name,
  date,
  category,
}: {
  name: string;
  date: string;
  category: string;
}) {
  const [data, setData] = React.useState();
  const formatter = useDateFormatter({ dateStyle: "medium" });
  const [icon, setIcon] = React.useState<ReactNode>(
    <BsCurrencyDollar size={18} />,
  );
  const [color, setColor] = React.useState<
    | "default"
    | "success"
    | "primary"
    | "warning"
    | "danger"
    | "secondary"
    | undefined
  >("default");

  React.useEffect(() => {
    fetch(`https://api.logo.dev/search?q=${name}`, {
      headers: {
        Bearer: process.env.NEXT_PUBLIC_LOGO_API_KEY!,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(
          name?.toLowerCase().includes("paycheck") ||
            name?.toLowerCase().includes("loan") ||
            name?.toLowerCase().includes("movie") ||
            name?.toLowerCase().includes("book") ||
            name?.toLowerCase().includes("haircut")
            ? null
            : name.toLowerCase() == "keurig" || name.toLowerCase() == "subway"
              ? data[1]?.logo_url
              : data[0]?.logo_url,
        );
      });

    switch (category) {
      case "Income":
        setColor("success");
        setIcon(<BsCashStack size={18} />);
        break;
      case "Housing":
        setColor("primary");
        setIcon(<BsHouse size={18} />);
        break;
      case "Bills":
        setColor("primary");
        setIcon(<BsCreditCard2Back size={18} />);
        break;
      case "Food & Dining":
        setColor("warning");
        setIcon(<BsCupHot size={18} />);
        break;
      case "Lifestyle":
        setColor("danger");
        setIcon(<BsAirplane size={18} />);
        break;
      case "Shopping":
        setColor("warning");
        setIcon(<BsCart2 size={18} />);
        break;
      case "Health & Wellness":
        setColor("danger");
        setIcon(<BsHeartPulse size={18} />);
        break;
      case "Other":
        setColor("default");
        setIcon(<BsQuestionLg size={18} />);
        break;
      case "Debt":
        setColor("secondary");
        setIcon(<BsMortarboard size={18} />);
        break;
      case "Savings":
        setColor("secondary");
        setIcon(<BsBank size={18} />);
        break;
      default:
        setColor("default");
        setIcon(<BsCurrencyDollar size={18} />);
        break;
    }
  }, [name, date, category]);

  return (
    <User
      avatarProps={{
        src: `${data}`,
        showFallback: true,
        size: "sm",
        isBordered: true,
        color: color,
        classNames: { base: "bg-default text-forground" },
        fallback: icon,
      }}
      description={
        <div className="flex flex-col">
          <span className="sm:hidden">{category}</span>
          <span>
            {formatter.format(parseDate(`${date}`).toDate(getLocalTimeZone()))}
          </span>
        </div>
      }
      name={name}
    />
  );
}
