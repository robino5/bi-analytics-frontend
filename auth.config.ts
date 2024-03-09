import type { NextAuthConfig } from "next-auth";
import CredendialProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/schemas";


type LoginResponse = {
  status: string;
  message: string | null;
  errors: string[];
  data: {
    id: string;
    username: string;
    name?: string;
    designation: string;
    phoneNumber: string;
    email: string;
  };
};

const loginWithApi = async (username: string, password: string): Promise<LoginResponse> => {
  return {
    status: "200",
    message: null,
    errors: [],
    data: {
      id: "1",
      username: username,
      name: "K.M. Jiaul Islam Jibon",
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
  async authorize(credentials, _) {
    const validatedFormFields = LoginSchema.safeParse(credentials);

    if (validatedFormFields.success) {
      const { username, password } = validatedFormFields.data;
      const response = await loginWithApi(username, password);
      if (Number.parseInt(response.status) !== 200) {
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
  }
} satisfies NextAuthConfig;
