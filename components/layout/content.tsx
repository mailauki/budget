export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full sm:col-span-7 hidden sm:flex flex-col gap-3">
      {children}
    </div>
  );
}
