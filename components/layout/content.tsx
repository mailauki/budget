export default function Content({ children }: { children: React.ReactNode }) {
  return <section className="order-2 md:col-span-8">{children}</section>;
}
