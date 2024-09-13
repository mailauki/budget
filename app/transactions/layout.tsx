import LayoutWrapper from "@/components/layout/wrapper";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
