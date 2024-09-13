export default function Aside({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full sm:col-span-5 hidden sm:flex flex-col gap-3">
      {children}
    </div>
  );
}
