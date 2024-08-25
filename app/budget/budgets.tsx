import RealtimeBudgets from "./realtime-budgets";

import { createClient } from "@/utils/supabase/server";

export default async function Budgets() {
  const supabase = createClient();
  const { data } = await supabase.from("budgets").select();
  const { data: transactions } = await supabase.from("transactions").select();
  // const { budgets } = await getBudgets();
  // const { transactions } = await getTransactions();
  // const budgetsData = getBudgets();
  // const transactionsData = getTransactions();

  // // Initiate both requests in parallel
  // const [{ budgets }, { transactions }] = await Promise.all([
  //   budgetsData,
  //   transactionsData,
  // ]);

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
  return (
    <RealtimeBudgets
      serverBudgets={data ?? []}
      serverTransactions={transactions ?? []}
    />
  );
}
