"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createAccount, loginUser } from "@/lib/actions/user.actions";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import OTPModal from "@/components/otp-modal";

const authFormSchema = (authMode: AuthMode) => {
  return (
    z.object({
      fullName: authMode === "create-account"
        ? z
          .string()
          .min(2, "Full name must be at least 2 characters.")
          .max(50, "Full name must be at most 50 characters.")
        : z.string().optional(),
      email: z.email("Invalid email address")
    })
  );
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(mode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = mode === "create-account" ? await createAccount({
        fullName: data.fullName || "",
        email: data.email
      }) : await loginUser({ email: data.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage(mode === "create-account" ? "Failed to create account. Please try again." : "Failed to login. Please try again.")
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-145 flex flex-col lg:gap-8 gap-6"
      >
        <FieldLegend>{mode === "login" ? "Login" : "Create Account"}</FieldLegend>

        {mode === "create-account" && (
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="p-4 shadow-1 rounded-12 flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="name"
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
              <div className="p-4 shadow-1 rounded-12 flex flex-col gap-1.5">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
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
          {isLoading && (
            <Spinner />
          )}

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

      {accountId && (
        <OTPModal
          accountId={accountId}
          email={form.getValues("email")}
        />
      )}
    </>
  );
};

export default AuthForm;