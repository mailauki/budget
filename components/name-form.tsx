import { Input } from "@nextui-org/react";
import React from "react";

import { Transaction } from "@/types";

export default function NameForm({ item }: { item: Transaction }) {
  const [value, setValue] = React.useState(item.name);

  return (
    <Input
      fullWidth
      aria-label="Name"
      className="min-w-[100px]"
      value={value}
      variant="underlined"
      // onFocusChange={() =>
      //   editTransaction({
      //     ...item,
      //     name: value,
      //   })
      // }
      onValueChange={setValue}
    />
  );
}
