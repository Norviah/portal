"use client";

import { InlineLink } from "@/components/InlineLink";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { SignUpFormSchema } from "@/sections/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { z } from "zod";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", name: "", role: "client" },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Successfully signed up.");
    setIsLoading(false);
  }

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input required placeholder="name" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input required placeholder="user@email.com" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input required placeholder="password" disabled={isLoading} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" loading={isLoading}>
            Sign up
          </Button>
        </form>
      </Form>

      <div className="flex justify-end">
        <p>
          Already have an account? <InlineLink href="/auth/signin" text="Sign in here" />
        </p>
      </div>
    </div>
  );
}
