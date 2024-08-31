import Transactions from "./transactions";

import { title } from "@/components/primitives";
import TransactionModal from "@/components/transaction-modal";
import { createClient } from "@/utils/supabase/server";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();

  return (
    <div className="col-span-12">
      <div className="flex items-center justify-between py-4">
        <h1 className={title()}>Transactions</h1>
        <TransactionModal />
      </div>
      <Transactions serverTransactions={data ?? []} />
    </div>
  );
}
