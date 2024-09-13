import LayoutWrapper from "@/components/layout/wrapper";

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
