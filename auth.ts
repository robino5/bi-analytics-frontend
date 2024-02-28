import CredendialProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

const credentialProvider = CredendialProvider({
  name: "LBSL Analytics",
  credentials: {
    username: {
      label: "Username",
      type: "text",
      placeholder: "jsmith",
      required: true,
    },
    password: { label: "Password", type: "password", required: true },
  },

  async authorize(credentials, req) {
    if (credentials.username === "shouldfail") {
      return null;
    }
    if (credentials.password === "sholdfail") {
      return null;
    }
    const user = {
      id: "1",
      username: "jibon",
      designation: "Senior Asst. Director",
      phoneNumber: "01778625131",
      email: "jiaulislam.ict.bd@gmail.com",
    };

    if (user) {
      return user;
    }
    return null;
  },
});

const configs = {
  providers: [credentialProvider],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(configs);
