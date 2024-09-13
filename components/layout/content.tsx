export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-12 md:col-span-7 hidden sm:block">
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
