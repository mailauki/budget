import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { getTransactions } from "../db/queries";

import NewTranactionForm from "./form";
import TransactionsList from "./list";

import { title } from "@/components/primitives";

export default async function TransactionsPage() {
  const { transactions } = await getTransactions();

  return (
    <>
      <Card className="w-full" radius="sm">
        <CardHeader className="flex gap-3">
          <p className={title()}>Transactions</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <TransactionsList transactions={transactions} />
        </CardBody>
        <Divider />
        <CardFooter>
          <NewTranactionForm />
        </CardFooter>
      </Card>
    </>
  );
}
