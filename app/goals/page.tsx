import Goals from "./goals";

import { createClient } from "@/utils/supabase/server";

export default async function GoalsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("goals").select();

  return <Goals serverGoals={data ?? []} />;
}
