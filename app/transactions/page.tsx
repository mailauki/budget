import Transactions from "./transactions";

import { createClient } from "@/utils/supabase/server";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();
  const { data: budgets } = await supabase.from("budgets").select();

  return (
    <Transactions
      serverBudgets={budgets ?? []}
      serverTransactions={data ?? []}
    />
  );
}
