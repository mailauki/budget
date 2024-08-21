"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { BsFillEyeFill, BsFillEyeSlashFill, BsGithub } from "react-icons/bs";

import { login, signup, signInWithGithub } from "../auth/actions";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className="mx-auto max-w-sm">
      <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-1.5 flex gap-2 sm:mt-8 border border-zinc-800">
        <Button
          fullWidth
          className={`${
            isRegister === false
              ? "bg-zinc-700 shadow-sm text-white"
              : "bg-transparent text-zinc-400"
          }`}
          radius="sm"
          onClick={() => setIsRegister(false)}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          className={`${
            isRegister === true
              ? "bg-zinc-700 shadow-sm text-white"
              : "bg-transparent text-zinc-400"
          }`}
          radius="sm"
          onClick={() => setIsRegister(true)}
        >
          Register
        </Button>
      </div>
      <form className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Input label="Email" radius="sm" type="email" />
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
          label="Password"
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
            variant="solid"
          >
            Log in
          </Button>
        )}
      </form>
      {/* <div className="max-w-xs flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Button fullWidth radius="sm" onClick={signInWithGithub}>
          <BsGithub />
          Login using Github
        </Button>
      </div> */}
    </section>
  );
}
