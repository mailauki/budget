import { Suspense } from "react";

import Transactions from "./transactions";

import { createClient } from "@/utils/supabase/server";

export default async function TransactionsPage() {
  const supabase = createClient();
  const { data: transactions } = await supabase.from("transactions").select();
  const { data: budgets } = await supabase.from("budgets").select();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Transactions
        serverBudgets={budgets ?? []}
        serverTransactions={transactions ?? []}
      />
    </Suspense>
  );
}
