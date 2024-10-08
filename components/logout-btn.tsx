import { Button } from "@nextui-org/button";

import { logout } from "@/app/auth/actions";

export default function Logout() {
  return (
    <form action={logout} className="w-full">
      <Button
        className="w-full text-sm justify-start"
        size="sm"
        type="submit"
        variant="light"
      >
        Logout
      </Button>
    </form>
  );
}
