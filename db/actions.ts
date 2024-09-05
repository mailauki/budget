/* eslint-disable no-console */
"use server";

import { Budget, Goal } from "@/types";
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
    category: formData.get("category"),
    category_label: formData.get("category_label"),
    name: formData.get("name") as string,
    credit: (formData.get("credit") as string) == "true" ? true : false,
    user_id: user?.id,
  };

  console.log({ data });
  const { error } = await supabase.from("transactions").insert(data);

  if (error) console.log(error);
}

export async function editTransaction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    amount: parseFloat((formData.get("amount") || 0) as string),
    category: formData.get("category"),
    category_label: formData.get("category_label"),
    name: formData.get("name"),
    date: formData.get("date"),
    credit: formData.get("credit"),
    user_id: user?.id,
  };
  const id = formData.get("id");

  console.log({ data });
  const { error } = await supabase
    .from("transactions")
    .upsert(!id || id == "" ? data : { ...data, id: id })
    .match({ id: id!, user_id: user?.id });

  if (error) console.log(error);
}

export async function editBudget(budget: Budget) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ budget });

  const { error } = await supabase
    .from("budgets")
    .upsert({ ...budget, user_id: user?.id })
    .match({ id: budget.id, user_id: user?.id });

  if (error) console.log(error);
}

export async function editGoal(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    name: formData.get("name"),
    goal_amount: parseFloat((formData.get("goal_amount") || 0) as string),
    current_amount: parseFloat((formData.get("current_amount") || 0) as string),
    contribution: parseFloat((formData.get("contribution") || 0) as string),
    user_id: user?.id,
  };
  const id = formData.get("id");
  const priority = formData.get("priority");

  console.log({ data });
  const { error } = await supabase
    .from("goals")
    .upsert(!id || id == "" ? data : { ...data, id: id, priority })
    .match({ id: id!, user_id: user?.id });

  if (error) console.log(error);
}

export async function updateGoal({ goal }: { goal: Goal }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("goals")
    .upsert(goal)
    .match({ id: goal.id!, user_id: user?.id });

  if (error) console.log(error);
}
