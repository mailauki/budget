export default function Aside({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:col-span-4 order-1 md:order-last">
      {children}
    </section>
  );
}
