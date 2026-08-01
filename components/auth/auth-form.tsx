"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { AuthFormProps, AuthMode } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const authFormSchema = (auth: AuthMode) => {
  return (
    z.object({
      fullName: auth === "create-account"
        ? z
          .string()
          .min(2, "Full name must be at least 2 characters.")
          .max(50, "Full name must be at most 50 characters.")
        : z
          .string()
          .optional(),
      email: z.email("Please enter a valid email address.")
    })
  );
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(mode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: ""
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-145 flex flex-col lg:gap-8 gap-6"
    >
      <h1 className="h1 max-lg:text-center">
        {mode === "login" ? "Login" : "Create Account"}
      </h1>

      {mode === "create-account" && (
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="p-4 shadow-drop-1 rounded-12 flex flex-col gap-1.5">
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id={field.name}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  required
                />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      )}

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="p-4 shadow-drop-1 rounded-12 flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                type="email"
                id={field.name}
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                required
              />
            </div>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Spinner />}

        <p>{mode === "login" ? "Login" : "Create Account"}</p>
      </Button>

      {errorMessage && (
        <p className="caption text-destructive text-center">
          *{errorMessage}
        </p>
      )}

      <div className="body-2 flex-center gap-1">
        <p>{mode === "login" ? "Don't have an account?" : "Already have an account?"}</p>

        <Link
          href={mode === "login" ? "/create-account" : "/login"}
          className="text-primary hover:text-primary/80 hover:underline"
        >
          {mode === "login" ? "Create Account" : "Login"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;