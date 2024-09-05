import Budgets from "./budgets";

import { createClient } from "@/utils/supabase/server";

export default async function BudgetPage() {
  const supabase = createClient();
  const { data } = await supabase.from("budgets").select();
  const { data: transactions } = await supabase.from("transactions").select();

  return (
    <>
      <Budgets
        serverBudgets={data ?? []}
        serverTransactions={transactions ?? []}
      />
    </>
  );
}
