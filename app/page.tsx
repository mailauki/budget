import Overview from "./overview";

import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data: transactions } = await supabase.from("transactions").select();
  const { data: budgets } = await supabase.from("budgets").select();
  const { data: goals } = await supabase.from("goals").select();

  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <section className="content w-full mx-auto py-6 md:py-8">
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-12 auto-rows-auto gap-y-4 md:gap-x-4">
        <Overview
          serverBudgets={budgets ?? []}
          serverGoals={goals ?? []}
          serverTransactions={transactions ?? []}
        />
      </div>
    </section>
  );
}
