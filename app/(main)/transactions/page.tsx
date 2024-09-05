import DatePicker from "@/components/date-picker";
import Transactions from "./transactions";

import { title } from "@/components/primitives";
import TransactionModal from "@/components/transactions/modal";
import { createClient } from "@/utils/supabase/server";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();

  return (
    <>
      <div className="md:col-span-12">
        <div className="flex items-center justify-between py-4 gap-2">
          <div className="flex-1">
            <h1 className={title()}>Transactions</h1>
          </div>
          <DatePicker selectedDate={"2024-09"} />
          <TransactionModal />
        </div>
      </div>
      <Transactions serverTransactions={data ?? []} />
    </>
  );
}
