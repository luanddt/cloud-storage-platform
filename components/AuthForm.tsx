"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";

const authFormSchema = (formMode: AuthMode) => {
  return (
    z.object({
      fullName: formMode === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
      email: z.email()
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await createAccount({
        fullName: values.fullName || "",
        email: values.email
      });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[580px] flex flex-col lg:gap-8 gap-6"
      >
        <h1 className="h1 max-lg:text-center">
          {mode === "sign-in" ? "Login" : "Create Account"}
        </h1>

        {mode === "sign-up" && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="p-4 shadow-drop-1 rounded-[12px] flex flex-col gap-1.5">
                  <FormLabel>Full Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter Your Full Name"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="p-4 shadow-drop-1 rounded-[12px] flex flex-col gap-1.5">
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
        >
          <p>{mode === "sign-in" ? "Login" : "Create Account"}</p>

          {isLoading && (
            <Image
              src="/assets/icons/loader.svg"
              alt="Loader"
              width={24}
              height={24}
              className="animate-spin"
            />
          )}
        </Button>

        {errorMessage && (
          <p className="body-2 text-destructive text-center">
            *{errorMessage}
          </p>
        )}

        <div className="body-2 flex-center gap-1">
          <p>{mode === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>

          <Link
            href={mode === "sign-in" ? "/sign-up" : "/sign-in"}
            className="text-primary hover:text-primary/80 hover:underline"
          >
            {mode === "sign-in" ? "Create Account" : "Login"}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;