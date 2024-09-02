import Goals from "./goals";

import GoalModal from "@/components/goals/modal";
import { title } from "@/components/primitives";
import { createClient } from "@/utils/supabase/server";

export default async function GoalsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("goals").select();

  return (
    <div className="col-span-12 gap-3">
      <div className="flex items-center justify-between py-4">
        <h1 className={title()}>Goals</h1>
        <GoalModal />
      </div>
      <Goals serverGoals={data ?? []} />
    </div>
  );
}
