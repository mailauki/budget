import { UUID } from "crypto";

import { Key, ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ToastProps = {
  type?: string;
  message?: string;
};

export interface UserType {
  email?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
}

export type UserProps = {
  user?: UserType;
};
export interface Categories {
  id: number;
  key?: Key;
  name: string;
  labels: Category[];
}

export interface Category {
  id: number;
  key?: Key;
  name: string;
}

export interface Account {
  id: number;
  account_name: string;
  current_balance: number;
  user_id: UUID;
}

export type AccountProps = {
  accounts?: Account[];
};

export interface Transaction {
  id: number;
  key?: Key;
  date: ReactNode;
  amount: number;
  category: string;
  name: string;
  credit: boolean;
  account_id: UUID;
  user_id: UUID;
}

export interface Budget {
  id: number;
  key?: Key;
  budget: number;
  actual: number;
  category: string;
  name: string;
  date: string;
  account_id: UUID;
  user_id: UUID;
}
