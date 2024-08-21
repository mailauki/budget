// import TodayCard from "@/components/today-card";
import User from "@/components/user";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1>Hello World!</h1>
        <User />
        {/* <TodayCard /> */}
      </div>
    </section>
  );
}
