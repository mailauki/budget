import NavList from "@/components/navigation/list";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      {/* lg - desktop */}
      <div className="hidden lg:grid grid-cols-11 auto-rows-auto grid-flow-row-dense gap-3">
        <div className="col-span-2 row-span-full">
          <div className="min-h-14 sticky top-14 z-40">
            <NavList />
          </div>
        </div>
        <div className="col-span-9">
          <div className="hidden lg:grid grid-cols-12 auto-rows-auto grid-flow-row-dense gap-3">
            {children}
          </div>
        </div>
      </div>

      {/* md & sm - mobile */}
      <div className="grid lg:hidden grid-cols-12 auto-rows-auto grid-flow-row-dense gap-3">
        {children}
      </div>
    </>
  );
}
