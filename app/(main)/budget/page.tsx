import { Suspense } from "react";

import Budgets from "./budgets";

import { createClient } from "@/utils/supabase/server";

export default async function BudgetPage() {
  const supabase = createClient();
  const { data: transactions } = await supabase.from("transactions").select();
  const { data: budgets } = await supabase.from("budgets").select();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Budgets
        serverBudgets={budgets ?? []}
        serverTransactions={transactions ?? []}
      />
    </Suspense>
  );
}
