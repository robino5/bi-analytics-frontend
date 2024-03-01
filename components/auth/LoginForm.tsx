"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ReloadIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/app/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/app/actions/login";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      login(values);
    });
  }
  return (
    <div className="grid grid-flow-col grid-columns-3 gap-2 place-items-center p-4">
      <div className="h-full w-full grid place-items-center">
        <Image
          src="/business_analytics.svg"
          height={500}
          width={400}
          alt="analytics-img"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <Separator orientation="vertical" className="mt-4 h-[350px]" />
      </div>
      <div className="min-w-72">
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
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
                      <Input disabled={isPending} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message="" />
              <FormSuccess message="" />
              {isPending ? (
                <Button className="float-right" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="float-right" type="submit">
                  <PaperPlaneIcon className="h-4 w-4 mr-2" /> Login
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
