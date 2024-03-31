import { RoleType } from "@/app/schemas";

interface IUserProfile {
    designation: string;
    image: string | null;
    branchId: number | null;
    branchName: string | null;
}

export interface IUser {
    id: number;
    name: string | null;
    lastLogin: Date | null;
    isSuperuser: boolean;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isStaff: boolean;
    isActive: boolean;
    dateJoined: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: RoleType;
    profile: IUserProfile;
    createdBy: number | null;
    updatedBy: number | null;
    groups: number[];
    userPermissions: any[];
}
