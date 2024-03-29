"use server";

import * as z from "zod";

import { auth } from "@/auth";

import { CreateUserSchema } from "@/app/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RedirectType, redirect } from "next/navigation";

export const createUserAction = async (payload: z.infer<typeof CreateUserSchema>) => {
    const session = await auth();

    if (!session) {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    const validatedFormFields = CreateUserSchema.safeParse(payload);

    if (!validatedFormFields.success) {
        return { error: "invalid payload !" };
    }

    const { username, password, email, role, isActive } = validatedFormFields.data;

    const body = {
        username,
        password,
        email,
        role,
        isActive
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.user.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 201) {
            console.error(await response.json())
        }
        redirect("/users", RedirectType.replace);
    } catch (error) {
        throw error;
    }
};
