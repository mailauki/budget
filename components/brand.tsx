"use client";

import { User } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { BsCurrencyDollar } from "react-icons/bs";

export default function Brand({
  name,
  date,
}: {
  name: string;
  date:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<any>;
}) {
  const [data, setData] = React.useState();
  const formatter = useDateFormatter({ dateStyle: "medium" });

  React.useEffect(() => {
    fetch(`https://api.logo.dev/search?q=${name?.split(" ")[0]}`, {
      headers: {
        Bearer: "sk_Mdb9WMB6SnS50euNeYcMKg",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(
          name?.toLowerCase().includes("paycheck") ||
            name?.toLowerCase().includes("loan") ||
            name?.toLowerCase().includes("movie")
            ? null
            : name?.split(" ")[0].toLowerCase() == "keurig" ||
                name?.split(" ")[0].toLowerCase() == "subway"
              ? data[1].logo_url
              : data[0].logo_url,
        );
      });
  }, []);

  return (
    <User
      avatarProps={{
        src: `${data}`,
        showFallback: true,
        // isBordered: true,
        // color: "default",
        // color={
        //   categories.expenses.find(({ name }) => name == transaction.category)
        //     ?.color || "default"
        // }
        fallback: (
          <BsCurrencyDollar
            className="w-6 h-6 text-forground"
            fill="currentColor"
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
