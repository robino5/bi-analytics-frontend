"use server";

import * as z from "zod";

import { signIn, signOut } from "@/auth";

import { LoginSchema } from "@/app/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (payload: z.infer<typeof LoginSchema>) => {
  const validatedFormFields = LoginSchema.safeParse(payload);

  if (!validatedFormFields.success) {
    return { error: "invalid payload !" };
  }

  const { username, password } = validatedFormFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
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

export const logoutAction = async () => {
  await signOut();
};
