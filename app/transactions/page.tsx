import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { title } from "@/components/primitives";

export default function TransactionsPage() {
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
