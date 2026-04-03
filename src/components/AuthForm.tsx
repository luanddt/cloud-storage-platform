"use client";

import { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import {
  Controller,
  useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createAccount } from "@/lib/actions/user.actions";

const authFormSchema = (authMode: AuthMode) => {
  return (
    z.object({
      fullName: authMode === "create-account"
        ? z.string().min(2, "Full Name must be at least 2 characters.").max(50, "Full Name must be at most 50 characters.")
        : z.string().optional(),
      email: z.email("Invalid email address.")
    })
  );
};

const AuthForm = ({ auth }: AuthFormProps) => {
  const [accountId, setAccountId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(auth);
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
      const user = await createAccount({
        fullName: data.fullName || "",
        email: data.email
      });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-145 flex flex-col lg:gap-8 gap-6"
    >
      <FieldLegend>{auth === "login" ? "Login" : "Create Account"}</FieldLegend>

      {auth === "create-account" && (
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="p-4 shadow-1 rounded-12 flex flex-col gap-1.5">
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Full Name"
                  autoComplete="off"
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
                placeholder="Enter Your Email"
                autoComplete="off"
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
        disabled={isLoading}
      >
        {isLoading && (
          <Spinner />
        )}

        <p className="button">
          {auth === "login" ? "Login" : "Create Account"}
        </p>
      </Button>

      {errorMessage && (
        <p className="body-2 text-destructive text-center">
          *{errorMessage}
        </p>
      )}

      <div className="body-2 flex-center gap-1">
        <p>{auth === "login" ? "Don't have an account?" : "Already have an account?"}</p>

        <Link
          href={auth === "login" ? "/create-account" : "/login"}
          className="text-primary hover:text-primary/80 hover:underline"
        >
          {auth === "login" ? "Create Account" : "Login"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;