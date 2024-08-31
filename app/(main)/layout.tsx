export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="content mx-auto grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 py-8 md:py-10">
      {children}
    </section>
  );
}
