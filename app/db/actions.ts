"use server";

import { createClient } from "@/utils/supabase/server";

export async function addAccount(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    account_name: formData.get("account-name") as string,
    date: formData.get("date"),
    category: formData.get("category") as string,
    user_id: user?.id,
  };

  // eslint-disable-next-line no-console
  console.log({ data });
}

export async function addTransaction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    date: formData.get("date"),
    amount: formData.get("amount"),
    category: formData.get("category") as string,
    label: formData.get("label") as string,
    account_id: formData.get("account") as string,
    user_id: user?.id,
  };

  // eslint-disable-next-line no-console
  console.log({ data });
}
