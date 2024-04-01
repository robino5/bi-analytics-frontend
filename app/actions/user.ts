"use server";

import * as z from "zod";

import { auth } from "@/auth";

import { CreateUserSchema, UpdateUserSchema } from "@/app/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export const createUserAction = async (
  payload: z.infer<typeof CreateUserSchema>
) => {
  const session = await auth();

  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const validatedFormFields = CreateUserSchema.safeParse(payload);

  if (!validatedFormFields.success) {
    return { error: "invalid payload !" };
  }

  const { username, firstName, lastName, password, email, role, isActive } =
    validatedFormFields.data;

  const body = {
    username,
    firstName,
    lastName,
    password,
    email,
    role,
    isActive,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status !== 201) {
      console.error(await response.json());
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserAction = async (username: string) => {
  const session = await auth();

  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/${username}/by-username/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 204) {
      console.error(await response.json());
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserAction = async (
  payload: z.infer<typeof UpdateUserSchema>
) => {
  const session = await auth();

  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/${payload.username}/by-username/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.status !== 200) {
      console.error(await response.json());
    }
    return { status: "success", message: "✔️ Profile has been updated" };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      return { status: "failed", message: "Upexpected token in response." };
    }
    return {status: "failed", message: "Server error. try later !"}
  }
};
