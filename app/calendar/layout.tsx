import LayoutWrapper from "@/components/layout/wrapper";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
