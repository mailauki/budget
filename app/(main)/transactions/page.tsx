import Transactions from "./transactions";

import { title } from "@/components/primitives";
import TransactionModal from "@/components/transaction-modal";
import { createClient } from "@/utils/supabase/server";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();

  return (
    <div className="w-full flex flex-col gap-2 my-3">
      <div className="flex items-center justify-between px-2">
        <h1 className={title()}>Transactions</h1>
        <TransactionModal />
      </div>
      <Transactions serverTransactions={data ?? []} />
    </div>
  );
}
