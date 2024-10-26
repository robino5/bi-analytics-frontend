import type { NextAuthConfig } from "next-auth";
import CredendialProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/schemas";

type LoginResponse = {
  status: string;
  code: string;
  message: string | null;
  data: {
    id: string;
    username: string;
    name?: string;
    designation?: string;
    phoneNumber?: string;
    email?: string;
    role: string;
    branchId: string | null;
  };
};

const loginWithApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${process.env.API_BASEURL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const credentialProvider = CredendialProvider({
  name: "LBSL Analytics",
  credentials: {
    username: {
      label: "Username",
      type: "text",
      required: true,
    },
    password: { label: "Password", type: "password", required: true },
  },
  async authorize(credentials, _) {
    const validatedFormFields = LoginSchema.safeParse(credentials);

    if (validatedFormFields.success) {
      const { username, password } = validatedFormFields.data;
      const response = await loginWithApi(username, password);
      if (Number.parseInt(response.code) !== 200) {
        return null;
      }
      return response.data;
    }
    return null;
  },
});

export default {
  providers: [credentialProvider],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
