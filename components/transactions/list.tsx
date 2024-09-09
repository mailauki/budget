"use client";

import React from "react";
import {
  parseDate,
  isSameMonth,
  getLocalTimeZone,
} from "@internationalized/date";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { BsCreditCard2Front } from "react-icons/bs";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { heading } from "../primitives";

import Brand from "./brand";
import TransactionForm from "./form";

import { Transaction } from "@/types";
import { categories } from "@/utils/categories";
import {
  useAccountingFormatter,
  useDateMediumFormatter,
} from "@/utils/formatters";
import { editTransaction } from "@/db/actions";
import { usePathname } from "next/navigation";

export default function TransactionsList({
  transactions,
  selectedDate,
}: {
  transactions: Transaction[];
  selectedDate: string;
}) {
  const pathname = usePathname();
  const dateMediumFormatter = useDateMediumFormatter();
  const accountingFormatter = useAccountingFormatter();
  const [dates, setDates] = React.useState<string[]>([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openItem, setOpenItem] = React.useState<Transaction>();

  function handleOpen(item: Transaction) {
    setOpenItem(item);
    // setOpenItem(transactions.find(({ id }) => id === item.id));
    onOpen();
  }

  React.useEffect(() => {
    setDates(
      Array.from(
        new Set(Array.from(transactions.flatMap(({ date }) => date as string))),
      ).sort(
        (date1, date2) =>
          new Date(`${date2}`).getTime() - new Date(`${date1}`).getTime(),
      ),
    );
  }, [transactions]);

  if (
    !transactions ||
    !dates ||
    transactions.length === 0 ||
    dates.length === 0 ||
    dates.filter((date) =>
      isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
    ).length === 0
  ) {
    return (
      <Listbox
        aria-label="Empty transactions table"
        emptyContent={
          <div className="mt-3">
            <p className={heading({ variant: "secondary" })}>
              No transactions yet
            </p>
          </div>
        }
      >
        {[]}
      </Listbox>
    );
  }

  return (
    <>
      <Listbox aria-label="List of transactions" variant="flat">
        {dates
          .filter((date) =>
            isSameMonth(parseDate(date), parseDate(`${selectedDate}-01`)),
          )
          .map((date) => (
            <ListboxSection
              key={date}
              className="mt-3"
              classNames={{
                heading: heading({ variant: "secondary" }),
                group: "mt-1",
              }}
              title={dateMediumFormatter.format(
                parseDate(`${date}`).toDate(getLocalTimeZone()),
              )}
            >
              {transactions
                .filter((item) => item.date === date)
                .map((item) => (
                  <ListboxItem
                    key={`${item.id}-${item.name}`}
                    classNames={{
                      title: `${item.credit && <BsCreditCard2Front />}`,
                    }}
                    description={`${item.category} • ${item.category_label}`}
                    endContent={
                      <div
                        className={`${
                          categories.income.find(({ labels }) =>
                            labels.find(
                              ({ name }) => name == item.category_label,
                            ),
                          ) && "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {accountingFormatter.format(item.amount)}
                      </div>
                    }
                    startContent={
                      <div className="pr-2">
                        <Brand transaction={item} />
                      </div>
                    }
                    title={item.name}
                    onPress={() => (pathname == "/" ? null : handleOpen(item))}
                  />
                ))}
            </ListboxSection>
          ))}
      </Listbox>
      <Modal
        isOpen={isOpen}
        radius="sm"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent action={editTransaction} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {openItem?.name} transaction
              </ModalHeader>
              <ModalBody>{<TransactionForm item={openItem} />}</ModalBody>
              <ModalFooter>
                <Button radius="sm" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-foreground text-background"
                  color="primary"
                  radius="sm"
                  type="submit"
                  onPress={onClose}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
