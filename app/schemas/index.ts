import * as z from "zod";

export enum RoleType {
  ADMIN = "ADMIN",
  MANAGEMENT = "MANAGEMENT",
  BRANCH_MANGAER = "BRANCH_MANAGER",
  CLUSTER_MANAGER = "CLUSTER_MANAGER",
  REGIONAL_MANAGER = "REGIONAL_MANAGER",
}

export const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Minimum 4 character username required !" }),
  password: z.string().min(1, { message: "Password is required !" }),
});

export const CreateUserSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.union([z.literal(""), z.string().email()]),
  password: z.string().min(4, "minium 4 character password is required"),
  role: z.nativeEnum(RoleType).default(RoleType.REGIONAL_MANAGER),
  isActive: z.boolean().default(true),
});

export const UpdateUserSchema = z.object({
  username: z.string().readonly(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.union([z.literal(""), z.string().email()]),
  role: z.nativeEnum(RoleType).default(RoleType.REGIONAL_MANAGER),
  profile: z.object({
    branchId: z.any().optional().readonly(),
  }),
  isActive: z.boolean().default(true),
});
