import { logout } from "@/app/auth/actions";

export default function Logout() {
  return (
    <form action={logout} className="w-full">
      <button
        // className="text-sm text-gray-400 hover:underline hover:text-gray-300"
        className="hover:underline"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}
