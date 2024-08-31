"use client";

import { User } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { BsCurrencyDollar } from "react-icons/bs";

export default function Brand({ name, date }: { name: string; date: string }) {
  const [data, setData] = React.useState();
  const formatter = useDateFormatter({ dateStyle: "medium" });

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
  }, [name, date]);

  return (
    <User
      avatarProps={{
        src: `${data}`,
        showFallback: true,
        size: "sm",
        // isBordered: true,
        // color: "default",
        // color={
        //   categories.expenses.find(({ name }) => name == transaction.category)
        //     ?.color || "default"
        // }
        fallback: (
          <BsCurrencyDollar
            // className="w-6 h-6 text-forground"
            // fill="currentColor"
            size={18}
          />
        ),
      }}
      description={formatter.format(
        parseDate(`${date}`).toDate(getLocalTimeZone()),
      )}
      name={name}
    />
  );
}
