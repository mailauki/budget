import { SVGProps } from "react";

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
