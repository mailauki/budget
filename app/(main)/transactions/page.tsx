import DatePicker from "@/components/date-picker";
import Transactions from "./transactions";

import { title } from "@/components/primitives";
import TransactionModal from "@/components/transactions/modal";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/layout/header";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();

  return <Transactions serverTransactions={data ?? []} />;
}
