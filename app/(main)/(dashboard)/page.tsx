import { Suspense } from "react";

import Overview from "./overview";

import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: transactions } = await supabase.from("transactions").select();
  const { data: budgets } = await supabase.from("budgets").select();
  const { data: goals } = await supabase.from("goals").select();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Overview
        serverBudgets={budgets ?? []}
        serverGoals={goals ?? []}
        serverTransactions={transactions ?? []}
      />
    </Suspense>
  );
}
