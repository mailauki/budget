import { Account } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getAccounts() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", user?.id)
    .returns<Account[]>();

  const accounts = (data ?? []) as Account[];

  return { accounts };
}
