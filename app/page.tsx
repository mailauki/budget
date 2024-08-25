import { redirect } from "next/navigation";

import { getUser } from "./db/queries";

import TodayCard from "@/components/today-card";
import UserCard from "@/components/user-card";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="max-w-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <UserCard user={user} />
      <TodayCard />
    </section>
  );
}
