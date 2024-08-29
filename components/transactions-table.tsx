"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useDateFormatter, useNumberFormatter } from "@react-aria/i18n";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import {
  BsCheck2,
  BsChevronDown,
  BsEye,
  BsPencil,
  BsTrash,
} from "react-icons/bs";

import TransactionForm from "./transaction-form";

import { Transaction } from "@/types";
import { editTransaction } from "@/db/actions";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
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
        case "name":
          return cellValue;
        case "date":
          return formatter.format(
            parseDate(`${cellValue}`).toDate(getLocalTimeZone()),
          );
        case "category":
          return cellValue;
        case "credit":
          return (
            transaction.credit && (
              <span className="text-lg text-default-400">
                <BsCheck2 className="mx-auto" />
              </span>
            )
          );
        case "amount":
          return formatterAmount.format(transaction.amount);
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <button
                  key="details"
                  onClick={() => handleOpen("See more for", transaction)}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <BsEye />
                  </span>
                </button>
              </Tooltip>
              <Tooltip content="Edit">
                <button
                  key="edit"
                  onClick={() => handleOpen("Edit", transaction)}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <BsPencil />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <button
                  key="delete"
                  onClick={() => handleOpen("Delete", transaction)}
                >
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <BsTrash />
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button className="justify-between" size="lg" variant="light">
            {transactions[0].date
              ? formatterFull.format(
                  parseDate(`${transactions[0].date}`).toDate(
                    getLocalTimeZone(),
                  ),
                )
              : "--"}
            <BsChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Selected category"
          className="p-0 [&_ul]:p-2"
          classNames={{
            base: "max-w-xs",
            list: "max-h-[300px] overflow-y-scroll",
          }}
          closeOnSelect={false}
          selectionMode="single"
        >
          {transactions.map(({ date }) => (
            <DropdownItem key={date as keyof Transaction}>
              {formatter.format(
                parseDate(`${date}`).toDate(getLocalTimeZone()),
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
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
        return <pre>{JSON.stringify(item, null, 2)}</pre>;
    }
  }, []);

  return (
    <>
      <Table
        fullWidth
        aria-label="Transactions table"
        radius="sm"
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onRowAction={(key) =>
          handleOpen("", transactions.find(({ name }) => name == key)!)
        }
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn
            key="name"
            allowsSorting
            align="start"
            className="uppercase"
          >
            Name
          </TableColumn>
          <TableColumn
            key="date"
            allowsSorting
            align="start"
            className="uppercase"
          >
            Date
          </TableColumn>
          <TableColumn
            key="category"
            align="start"
            className="uppercase hidden sm:table-cell"
          >
            Category
          </TableColumn>
          <TableColumn
            key="credit"
            align="center"
            className="uppercase hidden sm:table-cell"
          >
            Credit
          </TableColumn>
          <TableColumn
            key="amount"
            allowsSorting
            align="start"
            className="uppercase"
          >
            Amount
          </TableColumn>
          <TableColumn key="actions" align="end" className="uppercase">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody items={sortedTransactions}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell
                  className={`${columnKey == "name" || columnKey == "date" ? "min-w-[120px]" : "min-w-min"} ${columnKey == "category" || columnKey == "credit" ? "hidden sm:table-cell" : "table-cell"}`}
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
        <ModalContent action={editTransaction} as="form">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {openType} {openItem?.name} transaction
              </ModalHeader>
              <ModalBody>{renderModal(openType!, openItem!)}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
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
