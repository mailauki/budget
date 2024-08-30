"use client";

import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useDateFormatter, useNumberFormatter } from "@react-aria/i18n";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { BsCheck2 } from "react-icons/bs";

import TransactionForm from "./transaction-form";
import Brand from "./brand";

import { Transaction } from "@/types";
import { editTransaction } from "@/db/actions";
import { categories } from "@/utils/helpers";

export default function TransactionsTable({
  transactions,
  date,
}: {
  transactions: Transaction[];
  date: string;
}) {
  const formatter = useDateFormatter({ dateStyle: "medium" });
  const formatterFull = useDateFormatter({ dateStyle: "full" });
  const formatterAmount = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    // trailingZeroDisplay: "stripIfInteger",
    // roundingPriority: "auto",
  });

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openType, setOpenType] = React.useState<string>();
  const [openItem, setOpenItem] = React.useState<Transaction>();

  function handleOpen(type: string, item: Transaction) {
    setOpenType(type);
    setOpenItem(item);
    onOpen();
  }

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });

  const sortedTransactions = React.useMemo(() => {
    return [...transactions].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Transaction] as number;
      const second = b[sortDescriptor.column as keyof Transaction] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, transactions]);

  const renderCell = React.useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];

      switch (columnKey) {
        case "date":
          return (
            <Brand date={`${transaction.date!}`} name={transaction.name!} />
          );
        case "category":
          return (
            <Chip
              // color={
              //   categories.expenses.find(
              //     ({ name }) => name == transaction.category,
              //   )?.color || "default"
              // }
              variant="dot"
            >
              {transaction.category}
            </Chip>
          );
        case "credit":
          return (
            <>
              {cellValue && (
                <span className="text-lg text-default-400">
                  <BsCheck2 className="mx-auto" />
                </span>
              )}
            </>
          );
        case "amount":
          return (
            <Chip
              color={
                categories.income.find(({ labels }) =>
                  labels.find(({ name }) => name == transaction.category),
                )
                  ? "success"
                  : "danger"
              }
              variant="light"
            >
              {formatterAmount.format(transaction.amount)}
            </Chip>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <p>
          {formatterFull.format(
            parseDate(`${date}`).toDate(getLocalTimeZone()),
          )}
        </p>
        <Divider />
      </div>
    );
  }, []);

  const renderModal = React.useCallback((type: string, item: Transaction) => {
    switch (type) {
      case "See more for":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-xs text-default-500">Name</p>
              <p className="text-md">{item.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-default-500">Amount</p>
              <p className="text-md">{formatterAmount.format(item.amount)}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-default-500">Date</p>
              <p className="text-md">
                {formatter.format(
                  parseDate(`${item.date}`).toDate(getLocalTimeZone()),
                )}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-default-500">Category</p>
              <p className="text-md">{item.category}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-default-500">Credit</p>
              <p className="text-md">
                Credit card {item.credit ? "" : "not"} used
              </p>
            </div>
          </div>
        );
      case "Edit":
        return <TransactionForm item={item} />;
      case "Delete":
        return <pre>{JSON.stringify(item, null, 2)}</pre>;
      default:
        return <TransactionForm item={item} />;
    }
  }, []);

  return (
    <>
      <Table
        fullWidth
        hideHeader
        isStriped
        // removeWrapper
        aria-label="Transactions table"
        radius="sm"
        selectionMode="single"
        // shadow="none"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        // topContentPlacement="outside"
        onRowAction={(key) =>
          handleOpen("", transactions.find(({ name }) => name == key)!)
        }
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn
            key="date"
            allowsSorting
            align="start"
            className="uppercase"
          >
            Transactions
          </TableColumn>
          <TableColumn key="category" align="start" className="uppercase">
            Category
          </TableColumn>
          <TableColumn
            key="credit"
            align="center"
            className="uppercase hidden sm:table-cell"
          >
            Credit
          </TableColumn>
          <TableColumn key="amount" align="end" className="uppercase">
            Amount
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Nothing to display"} items={transactions}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell
                  className={`${columnKey == "credit" ? "hidden sm:table-cell" : "table-cell"}`}
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
                {openType} {openItem?.name} transaction
              </ModalHeader>
              <ModalBody>{renderModal(openType!, openItem!)}</ModalBody>
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
