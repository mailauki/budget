import { Link } from "@nextui-org/link";

import { logout } from "@/app/auth/actions";

export default function Logout() {
  return (
    <form action={logout} className="w-full">
      {/* <button
        // className="text-sm text-gray-400 hover:underline hover:text-gray-300"
        // className="hover:underline"
        className="hover:text-gray-600 dark:hover:text-gray-300"
        type="submit"
      >
        Logout
      </button> */}
      <Link
        as="button"
        className="text-large sm:text-medium"
        color="foreground"
        type="submit"
      >
        Logout
      </Link>
    </form>
  );
}
