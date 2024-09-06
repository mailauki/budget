"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { BsCreditCard2Front } from "react-icons/bs";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import Brand from "./brand";
import TransactionForm from "./form";

import { Transaction } from "@/types";
import { editTransaction } from "@/db/actions";
import { categories } from "@/utils/categories";
import {
  useAccountingFormatter,
  useCurrencyFormatter,
  useDateFullFormatter,
} from "@/utils/formatters";

export default function TransactionsTable({
  transactions,
  date,
}: {
  transactions: Transaction[];
  date: string;
}) {
  const currencyFormatter = useCurrencyFormatter();
  const accountingFormatter = useAccountingFormatter();
  const dateFullFormatter = useDateFullFormatter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openItem, setOpenItem] = React.useState<Transaction>();

  function handleOpen(item: Transaction) {
    // setOpenItem(item);
    setOpenItem(transactions.find(({ id }) => id === item.id));
    onOpen();
  }

  return (
    <>
      <Card radius="sm">
        <CardHeader className="flex justify-between">
          <div>
            {dateFullFormatter.format(
              parseDate(`${date}`).toDate(getLocalTimeZone()),
            )}
          </div>
          <Chip className="font-bold" size="lg" variant="flat">
            {currencyFormatter.format(
              transactions.reduce(
                (partialSum, item) =>
                  item.category === "Income"
                    ? partialSum + 0
                    : partialSum + item.amount,
                0,
              ),
            )}
          </Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <Listbox className="pb-2" items={transactions} variant="flat">
            {(item) => (
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
                        labels.find(({ name }) => name == item.category_label),
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
                onPress={() => handleOpen(item)}
              />
            )}
          </Listbox>
        </CardBody>
      </Card>
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
