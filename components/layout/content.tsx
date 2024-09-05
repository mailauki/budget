export default function Content({ children }: { children: React.ReactNode }) {
  return <section className="md:col-span-7">{children}</section>;
}
