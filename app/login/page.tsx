"use client";

import React from "react";
import { Button, Divider, Input, Link, Tab, Tabs } from "@nextui-org/react";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsGithub,
  BsGoogle,
} from "react-icons/bs";
import { usePathname } from "next/navigation";

import {
  login,
  signInWithGithub,
  signInWithGoogle,
  signup,
} from "@/app/auth/actions";
import { heading } from "@/components/primitives";

export default function LoginPage() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<string | number>("login");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isInvalid = React.useMemo(() => {
    return pathname === "/error" && true;
  }, [pathname]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs
        fullWidth
        aria-label="Tabs form"
        radius="sm"
        selectedKey={selected}
        size="md"
        onSelectionChange={setSelected}
      >
        <Tab key="login" title="Login">
          <form action={login} className="flex flex-col gap-4">
            <Input
              isRequired
              isInvalid={isInvalid}
              label="Email"
              name="email"
              placeholder="Enter your email"
              radius="sm"
              type="email"
            />
            <Input
              isRequired
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <p className="text-2xl text-default-400 pointer-events-none pb-1.5">
                      <BsFillEyeSlashFill />
                    </p>
                  ) : (
                    <p className="text-2xl text-default-400 pointer-events-none pb-1.5">
                      <BsFillEyeFill />
                    </p>
                  )}
                </button>
              }
              isInvalid={isInvalid}
              label="Password"
              name="password"
              placeholder="Enter your password"
              radius="sm"
            />
            <p className="text-center text-small">
              Need to create an account?{" "}
              <Link
                className="cursor-pointer"
                size="sm"
                underline="hover"
                onPress={() => setSelected("sign-up")}
              >
                Sign up
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                radius="sm"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Tab>
        <Tab key="sign-up" title="Sign up">
          <form action={signup} className="flex flex-col gap-4 h-[300px]">
            <Input
              isRequired
              isInvalid={isInvalid}
              label="Name"
              name="name"
              placeholder="Enter your name"
              radius="sm"
              type="text"
            />
            <Input
              isRequired
              isInvalid={isInvalid}
              label="Email"
              name="email"
              placeholder="Enter your email"
              radius="sm"
              type="email"
            />
            <Input
              isRequired
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <p className="text-2xl text-default-400 pointer-events-none pb-1.5">
                      <BsFillEyeSlashFill />
                    </p>
                  ) : (
                    <p className="text-2xl text-default-400 pointer-events-none pb-1.5">
                      <BsFillEyeFill />
                    </p>
                  )}
                </button>
              }
              isInvalid={isInvalid}
              label="Password"
              name="password"
              placeholder="Enter your password"
              radius="sm"
            />
            <p className="text-center text-small">
              Already have an account?{" "}
              <Link
                className="cursor-pointer"
                size="sm"
                underline="hover"
                onPress={() => setSelected("login")}
              >
                Login
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                radius="sm"
                size="lg"
                type="submit"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
      <div className="w-full flex items-center justify-evenly gap-2">
        <Divider className="w-2/5" />
        <p className={heading({ variant: "subtitle" })}>or</p>
        <Divider className="w-2/5" />
      </div>
      <div className="w-full flex flex-col gap-4 py-3">
        <form action={signInWithGoogle}>
          <Button fullWidth radius="sm" size="lg" type="submit">
            <BsGoogle />
            {selected == "login" ? "Login" : "Sign up"} using Google
          </Button>
        </form>
        <form action={signInWithGithub}>
          <Button fullWidth radius="sm" size="lg" type="submit">
            <BsGithub />
            {selected == "login" ? "Login" : "Sign up"} using Github
          </Button>
        </form>
      </div>
    </div>
  );
}
