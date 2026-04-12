"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createAccount, login } from "@/lib/actions/user.actions";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OTPModal from "@/components/OTPModal";

const authFormSchema = (formMode: FormMode) => {
  return (
    z.object({
      fullName: formMode === "create-account"
        ? z.string()
          .min(2, "Full Name must be at least 2 characters.")
          .max(50, "Full Name must be at most 50 characters.")
        : z.string().optional(),
      email: z.email("Invalid email address.")
    })
  );
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [accountId, setAccountId] = useState(null);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = mode === "create-account"
        ? await createAccount({
          fullName: data.fullName || "",
          email: data.email
        })
        : await login({ email: data.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage(
        mode === "create-account"
          ? "Failed to create account. Please try again."
          : "Failed to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <>
      <form
        className="w-full max-w-145 flex flex-col lg:gap-8 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldLegend>{mode === "login" ? "Login" : "Create Account"}</FieldLegend>

        {mode === "create-account" && (
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="p-4 shadow-1 rounded-12 flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>
                    Full Name
                  </FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Enter Your Full Name"
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
                <FieldLabel htmlFor={field.name}>
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  type="email"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          className="py-6 button"
          disabled={isLoading}
        >
          {isLoading && (
            <Image
              src="/assets/icons/loader-white.svg"
              alt="Loader"
              width={24}
              height={24}
              className="animate-spin"
            />
          )}

          {mode === "login" ? "Login" : "Create Account"}
        </Button>

        {errorMessage && (
          <p className="body-2 text-destructive text-center">
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