import TodayCard from "@/components/today-card";
import UserCard from "@/components/user-card";

export default function Home() {
  return (
    <section className="max-w-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1>Hello World!</h1>
      </div>
      <UserCard />
      <TodayCard />
    </section>
  );
}
