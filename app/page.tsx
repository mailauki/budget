import TodayCard from "@/components/today-card";
import UserCard from "@/components/user-card";

export default function Home() {
  return (
    <section className="max-w-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <UserCard />
      <TodayCard />
    </section>
  );
}
