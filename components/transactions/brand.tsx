"use client";

import { Avatar, Badge } from "@nextui-org/react";
import React from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

import { getCategoryColor } from "@/utils/colors";
import { getCategoryIcon } from "@/utils/icons";
import { Transaction } from "@/types";
import { categories } from "@/utils/categories";

export default function Brand({ transaction }: { transaction: Transaction }) {
  const [data, setData] = React.useState();
  const isIncome = categories.income.find(({ labels }) =>
    labels.find(({ name }) => name == transaction.category_label),
  );

  React.useEffect(() => {
    // fetch(`https://api.logo.dev/search?q=${name}`, {
    //   headers: {
    //     Bearer: process.env.NEXT_PUBLIC_LOGO_API_KEY!,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(
    //       name?.toLowerCase().includes("paycheck") ||
    //         name?.toLowerCase().includes("loan") ||
    //         name?.toLowerCase().includes("movie") ||
    //         name?.toLowerCase().includes("book") ||
    //         name?.toLowerCase().includes("haircut")
    //         ? null
    //         : name.toLowerCase() == "keurig" || name.toLowerCase() == "subway"
    //           ? data[1]?.logo_url
    //           : data[0]?.logo_url,
    //     );
    //   });
  }, [transaction]);

  return (
    <Badge
      isOneChar
      color={isIncome ? "success" : "danger"}
      content={
        isIncome ? <BsArrowUpShort size={16} /> : <BsArrowDownShort size={16} />
      }
      placement="bottom-right"
      shape="circle"
      showOutline={false}
      variant="faded"
    >
      <Avatar
        showFallback
        classNames={{
          base: `bg-default text-forground ring-${getCategoryColor(transaction.category)}-500`,
        }}
        fallback={getCategoryIcon({ category: transaction.category })}
        src={`${data}`}
      />
      {/* -・• */}
    </Badge>
  );
}
