import type { NextAuthConfig } from "next-auth";
import CredendialProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/schemas";

const loginWithApi = async (username: string, password: string) => {
  return {
    status: "200",
    message: null,
    errors: [],
    data: {
      id: "1",
      username: username,
      designation: "Senior Asst. Director",
      phoneNumber: "01778625131",
      email: "jiaulislam.ict.bd@gmail.com",
    },
  };
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

  async authorize(credentials, req) {
    const validatedFormFields = LoginSchema.safeParse(credentials);

    if (validatedFormFields.success) {
      const { username, password } = validatedFormFields.data;
      const response = await loginWithApi(username, password);

      if (Number.parseInt(response.status) !== 200) {
        return response.data;
      }
      return null;
    }
    return null;
  },
});

export default {
  providers: [credentialProvider],
  pages: {
    signIn: "/auth/login",
  }
} satisfies NextAuthConfig;
