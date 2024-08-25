import Users from "@/components/users";
import TodayCard from "@/components/today-card";

export default function Home() {
  return (
    <section className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Users />
      <TodayCard />
    </section>
  );
}
