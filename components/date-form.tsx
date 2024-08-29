import {
  Calendar,
  Chip,
  DateInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import { Transaction } from "@/types";

export default function DateForm({ item }: { item: Transaction }) {
  const formatter = useDateFormatter({ dateStyle: "medium" });
  const [value, setValue] = React.useState(parseDate(`${item.date}`));

  return (
    <Popover
    // onClose={() =>
    //   editTransaction({
    //     ...item,
    //     date: parseDate(`${value}`)
    //       .toDate(getLocalTimeZone())
    //       .toISOString()
    //       .substring(0, 10),
    //   })
    // }
    >
      <PopoverTrigger>
        <Chip as="button" variant="light">
          {formatter.format(
            parseDate(`${item.date}`).toDate(getLocalTimeZone()),
          )}
        </Chip>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3 py-4">
          <DateInput
            className="max-w-sm"
            label="Date"
            value={value}
            onChange={setValue}
          />
          <Calendar value={value} onChange={setValue} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
