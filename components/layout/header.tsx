export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:col-span-12 order-first">
      <div className="flex flex-wrap items-center justify-between py-4 gap-2">
        {children}
      </div>
    </section>
  );
}
