"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, KeyRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Logout from "./logout";
import Link from "next/link";
import ChangePassword from "./change-password-dropdown";

const UserMenu = () => {
    const { data: session } = useSession();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    if (!session) {
        redirect("/auth/login");
    }


    const profileImg = session.user.image
        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/media/${session.user.image}/`
        : "/man.png";
    const username = session.user.name || session.user.username;
    const subtitle = session.user.designation || session.user.role;


    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={profileImg} alt={username} />
                            <AvatarFallback className="text-lg font-bold"></AvatarFallback>
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-lg">
                    <DropdownMenuLabel className="text-sm">
                        <div className="font-semibold text-lg">{username}</div>
                        <div className="text-sm text-muted-foreground">{subtitle}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                        <Link href={`/users/${session?.user.username}`} className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* Change Password */}
                    <DropdownMenuItem
                    className="flex items-center gap-2"
                        onClick={() => {
                            setDropdownOpen(false);
                            setTimeout(() => setIsChangePasswordOpen(true), 100);
                        }}
                    >
                       <KeyRound className="h-4 w-4" /> Change Password
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* Logout */}
                    <DropdownMenuItem>
                        <Logout />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Modal */}
            <ChangePassword open={isChangePasswordOpen} setOpen={setIsChangePasswordOpen} username={session.user.username} />
        </>
    );
};

export default UserMenu;
