import { Card, CardHeader } from "@nextui-org/card";

import { getAccounts } from "@/app/db/queries";

// import { createClient } from "@/utils/supabase/server";

export default async function Accounts() {
  // const supabase = createClient();
  // const { data: accounts } = await supabase.from("accounts").select();
  const { accounts } = await getAccounts();

  // return <pre>{JSON.stringify(accounts, null, 2)}</pre>;
  return (
    <div className="flex flex-col gap-2 my-3">
      {accounts?.map((acc) => (
        <Card key={acc.id} className="w-full" radius="sm">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-xl">{acc.account_name}</p>
              <p className="text-small text-default-500">
                ${acc.current_balance.toFixed(2)}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
