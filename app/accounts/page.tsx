import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";

import { getAccounts } from "../../db/queries";

import NewAccountForm from "./form";
import AccountsList from "./list";

import { title } from "@/components/primitives";

export default async function AccountsPage() {
  const { accounts } = await getAccounts();

  if (accounts.length == 0) {
    return (
      <Card className="w-full" radius="sm">
        <CardHeader>
          <p className="text-xl">No Accounts Yet</p>
        </CardHeader>
        <CardFooter>
          <Button>Add an Account</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 my-3">
      <Card className="w-full" radius="sm">
        <CardHeader className="flex gap-3">
          <p className={title()}>Accounts</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <AccountsList accounts={accounts} />
        </CardBody>
        <Divider />
        <CardFooter>
          <NewAccountForm />
        </CardFooter>
      </Card>
    </div>
  );
}
