export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="content w-full mx-auto grid grid-flow-row-dense grid-cols-1 md:grid-cols-12 auto-rows-auto gap-y-4 md:gap-x-4 py-6 md:py-8">
      {children}
    </section>
  );
}
