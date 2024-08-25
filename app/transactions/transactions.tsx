// import { getTransactions } from "./queries";
import RealtimeTransactions from "./realtime-transactions";

import { createClient } from "@/utils/supabase/server";

export default async function Transactions() {
  const supabase = createClient();

  const { data } = await supabase.from("transactions").select();
  // const { transactions } = await getTransactions();

  return <RealtimeTransactions serverTransactions={data ?? []} />;
}
