import RealtimeBudgets from "./realtime-budgets";

import { createClient } from "@/utils/supabase/server";

export default async function Budgets() {
  const supabase = createClient();
  const { data } = await supabase.from("budgets").select();
  const { data: transactions } = await supabase.from("transactions").select();

  return (
    <RealtimeBudgets
      serverBudgets={data ?? []}
      serverTransactions={transactions ?? []}
    />
  );
}
