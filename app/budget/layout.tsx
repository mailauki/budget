import LayoutWrapper from "@/components/layout/wrapper";

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
