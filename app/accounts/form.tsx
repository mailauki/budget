import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { addAccount } from "../db/actions";

export default function NewAccountForm() {
  return (
    <form action={addAccount} className="flex flex-col gap-2">
      <Input id="account-name" label="Account Name" name="account-name" />
      <Button type="submit">Add Account</Button>
    </form>
  );
}
