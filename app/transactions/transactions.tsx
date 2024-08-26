import RealtimeTransactions from "./realtime-transactions";

import { createClient } from "@/utils/supabase/server";

export default async function Transactions() {
  const supabase = createClient();
  const { data } = await supabase.from("transactions").select();


  return <RealtimeTransactions serverTransactions={data ?? []} />;
}
