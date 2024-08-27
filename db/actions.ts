/* eslint-disable no-console */
"use server";

import { Transaction } from "@/types";
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

  const { error } = await supabase.from("accounts").insert(data);

  // if (error) alert(error.message);
  if (error) console.log(error);
}

export async function addTransaction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    date: formData.get("date"),
    amount: parseFloat(formData.get("amount") as string),
    category: formData.get("category") as string,
    label: formData.get("name") as string,
    credit: (formData.get("credit") as string) == "true" ? true : false,
    // account_id: formData.get("account") as string,
    user_id: user?.id,
  };

  console.log({ data });
  const { error } = await supabase.from("transactions").insert(data);

  // if (error) alert(error.message);
  if (error) console.log(error);
}

export async function editTransaction(transaction: Transaction) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ transaction });

  const { data, error } = await supabase
    .from("transactions")
    .upsert(transaction)
    .match({ id: transaction.id, user_id: user?.id })
    .select()
    .maybeSingle();

  console.log({ data });

  if (error) console.log(error);
}

export async function editBudget(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    id: formData.get("id"),
    budget: parseFloat(formData.get("budget") as string),
    category: formData.get("category"),
    label: formData.get("name"),
    date: formData.get("date"),
    user_id: user?.id,
  };

  console.log({ data });
  const { error } = await supabase
    .from("budgets")
    .upsert(data)
    .match({ id: data.id, user_id: user?.id });

  // if (error) alert(error.message);
  if (error) console.log(error);
}
