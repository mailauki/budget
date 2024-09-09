import NavList from "./list";

export function NavSidebar() {
  return (
    <div className="fixed top-20 w-56">
      <div className="flex flex-col flex-1 h-full py-6 md:py-8">
        <NavList />
      </div>
    </div>
  );
}
