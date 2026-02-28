"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const authFormSchema = (mode: AuthMode) => {
  return (
    z.object({
      fullName: mode === "login" ? z.string().optional() : z.string().min(2).max(50),
      email: z.email()
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-145 flex flex-col lg:gap-8 gap-6"
        >
          <h1 className="h1 max-lg:text-center">
            {mode === "login" ? "Login" : "Create Account"}
          </h1>

          {mode === "create-account" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="p-4 shadow-drop-1 rounded-12 flex flex-col gap-1.5">
                    <FormLabel>Full Name</FormLabel>

                    <FormControl>
                      <Input
                        type="text"
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
                <div className="p-4 shadow-drop-1 rounded-12 flex flex-col gap-1.5">
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
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
            <p className="button">
              {mode === "login" ? "Login" : "Create Account"}
            </p>

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

          <div className="flex-center gap-1">
            <p className="body-2">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </p>

            <Link
              href={mode === "login" ? "/create-account" : "/login"}
              className="body-2 text-primary hover:text-primary/90 hover:underline"
            >
              {mode === "login" ? "Create Account" : "Login"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;