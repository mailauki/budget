"use client";

import { Button } from "@nextui-org/button";
import React from "react";
// import { Button, Card, CardBody, Input } from "@nextui-org/react";
// import { BsFillEyeFill, BsFillEyeSlashFill, BsGithub } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

// import { login, signInWithGithub, signup } from "@/app/auth/actions";
import { signInWithGithub } from "@/app/auth/actions";

export default function LoginPage() {
  // const [isVisible, setIsVisible] = React.useState(false);
  // const [isRegister, setIsRegister] = React.useState(false);

  // const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className="mx-auto max-w-sm">
      {/* <Card radius="sm">
        <CardBody className="flex flex-row gap-2 p-2">
          <Button
            fullWidth
            radius="sm"
            variant={isRegister === false ? "solid" : "light"}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            radius="sm"
            variant={isRegister === true ? "solid" : "light"}
            onClick={() => setIsRegister(true)}
          >
            Register
          </Button>
        </CardBody>
      </Card> */}
      {/* <form className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Input id="email" label="Email" name="email" radius="sm" type="email" />
        <Input
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
          id="password"
          label="Password"
          name="password"
          radius="sm"
          type={isVisible ? "text" : "password"}
        />
        {isRegister ? (
          <Button
            fullWidth
            color="primary"
            formAction={signup}
            radius="sm"
            size="lg"
            type="submit"
            variant="solid"
          >
            Sign up
          </Button>
        ) : (
          <Button
            fullWidth
            color="primary"
            formAction={login}
            radius="sm"
            size="lg"
            type="submit"
            variant="solid"
          >
            Log in
          </Button>
        )}
      </form> */}
      <form action={signInWithGithub}>
        <Button fullWidth radius="sm" size="lg" type="submit">
          <BsGithub />
          Login using Github
        </Button>
      </form>
    </section>
  );
}
