import { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

export type ExtendedUser = DefaultSession["user"] & {
    username: string;
    designation: string;
    role: "ADMIN" | "BRANCH_MANAGER" | "RM" | "CLUSTER_MANAGER";
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}
