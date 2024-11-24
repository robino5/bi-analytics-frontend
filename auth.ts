import NextAuth from "next-auth";

import authConfig from "@/auth.config";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        // @ts-ignore
        session.user.name = token?.me?.name
        // @ts-ignore
        session.user.username = token?.me?.username
        // @ts-ignore
        session.user.designation = token?.me?.designation
        // @ts-ignore
        session.user.role = token?.me?.role
        // @ts-ignore
        session.user.accessToken = token?.me?.accessToken
        // @ts-ignore
        session.user.branchId = token?.me?.profile?.branchId
        // @ts-ignore
        session.expires = token?.me?.expires
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.me = user;
      }
      return token;
    }
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 1 },
  ...authConfig,
});
