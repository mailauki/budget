import Header from "@/components/layout/header";
import Budgets from "./budgets";

import { createClient } from "@/utils/supabase/server";
import { title } from "@/components/primitives";
import DatePicker from "@/components/date-picker";

export default async function BudgetPage() {
  const supabase = createClient();
  const { data } = await supabase.from("budgets").select();
  const { data: transactions } = await supabase.from("transactions").select();

  return (
    <>
      <Header>
        <div className="flex-1">
          <h1 className={title()}>Budgets</h1>
        </div>
        <DatePicker selectedDate={"2024-09"} />
      </Header>
      <Budgets
        serverBudgets={data ?? []}
        serverTransactions={transactions ?? []}
      />
    </>
  );
}
