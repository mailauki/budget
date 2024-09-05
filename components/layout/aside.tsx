export default function Aside({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:col-span-5 order-first md:order-last">
      {children}
    </section>
  );
}
