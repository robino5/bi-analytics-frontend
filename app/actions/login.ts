"use server";

import * as z from "zod";

import { signIn } from "@/auth";

import { LoginSchema } from "@/app/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (payload: z.infer<typeof LoginSchema>) => {
  const validatedFormFields = LoginSchema.safeParse(payload);

  // setTimeout(() => {
  //   console.log(validatedFormFields);
  // }, 10000);

  if (!validatedFormFields.success) {
    return { error: "invalid payload !" };
  }

  const { username, password } = validatedFormFields.data;

  try {
    await signIn("credential", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials !",
          };
        default:
          return {
            error: "Something went wrong !",
          };
      }
    }
    throw error;
  }
};
