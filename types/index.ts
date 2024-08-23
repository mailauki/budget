import { UUID } from "crypto";

import { ReactNode, SVGProps } from "react";

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
export interface Category {
  id: UUID;
  label: string;
}

export interface Account {
  id: UUID;
  account_name: string;
  current_balance: number;
  user_id: UUID;
}

export type AccountProps = {
  accounts?: Account[];
};

export interface Transaction {
  id: UUID;
  date: ReactNode;
  amount: number;
  category: string;
  label: string;
  account_id: UUID;
  user_id: UUID;
}

export interface Budget {
  id: UUID;
  budget: number;
  actual: number;
  category: string;
  label: string;
  date: Date;
  account_id: UUID;
  user_id: UUID;
}
