import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Minimum 4 character username required !" }),
  password: z.string().min(1, { message: "Password is required !" }),
});
