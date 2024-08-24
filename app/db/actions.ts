/* eslint-disable no-console */
"use server";

import { createClient } from "@/utils/supabase/server";

export async function addAccount(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    account_name: formData.get("account-name") as string,
    user_id: user?.id,
  };

  const { error } = await supabase.from("accounts").upsert(data);

  if (error) alert(error.message);
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

  console.log({ data });
  const { error } = await supabase.from("transactions").upsert(data);

  if (error) alert(error.message);
}

export async function editBudget(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    budget: formData.get("budget"),
    category: formData.get("category"),
    label: formData.get("label"),
    date: formData.get("date"),
    user_id: user?.id,
  };

  console.log({ data });
  const { error } = await supabase.from("budgets").upsert(data);

  if (error) alert(error.message);
}
