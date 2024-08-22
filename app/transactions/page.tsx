import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";

import { getTransactions } from "../db/queries";

import { title } from "@/components/primitives";

export default async function TransactionsPage() {
  const { transactions } = await getTransactions();

  if (transactions.length == 0) {
    return (
      <Card className="w-full" radius="sm">
        <CardHeader>
          <p className="text-xl">No Transactions Yet</p>
        </CardHeader>
        <CardFooter>
          <Button>Add a Transaction</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full" radius="sm">
      <CardHeader className="flex gap-3">
        <p className={title()}>Transactions</p>
      </CardHeader>
      <Divider />
      <CardBody />
      <Divider />
      <CardFooter />
    </Card>
  );
}
