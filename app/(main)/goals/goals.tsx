import { Goal } from "@/types";

export default function RealtimeGoals({
  serverGoals,
}: {
  serverGoals: Goal[];
}) {
  return (
    <>
      <pre>{JSON.stringify(serverGoals, null, 2)}</pre>
    </>
  );
}
