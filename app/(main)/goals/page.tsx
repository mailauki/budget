import { Suspense } from "react";

import Goals from "./goals";

import { createClient } from "@/utils/supabase/server";

export default async function GoalsPage() {
  const supabase = createClient();
  const { data: goals } = await supabase.from("goals").select();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Goals serverGoals={goals ?? []} />
    </Suspense>
  );
}
