export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {children}
    </section>
  );
}