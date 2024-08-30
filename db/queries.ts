import { cache } from "react";

import { Account, Budget, Transaction } from "@/types";
import { createClient } from "@/utils/supabase/server";

// export async function getUser() {
//   const supabase = createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return user;
// }

export const getUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

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

export async function getTransactions() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("transactions")
    .select()
    .eq("user_id", user?.id)
    .returns<Transaction[]>();

  const transactions = (data ?? []) as Transaction[];

  return { transactions };
}

export async function getBudgets() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("budgets")
    .select()
    .eq("user_id", user?.id)
    .returns<Budget[]>();

  const budgets = (data ?? []) as Budget[];

  return { budgets };
}

export async function getBrand(name: string) {
  let data = await fetch(`https://api.logo.dev/search?q=${name}`, {
    headers: {
      Bearer: "sk_Mdb9WMB6SnS50euNeYcMKg",
    },
  });
  let brand = await data.json();

  return brand[0].logo_url as string;
}
