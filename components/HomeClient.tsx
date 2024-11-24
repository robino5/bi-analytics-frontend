"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeClient({ redirectUrl, role, accessToken }: { redirectUrl: string, role: string, accessToken: string }) {
    const router = useRouter();

    useEffect(() => {
        if (role) {
            localStorage.setItem("token", accessToken)
            localStorage.setItem("userRole", role); // Set the role in localStorage
        }
        router.push(redirectUrl); // Redirect to the target URL
    }, [role, redirectUrl, router]);

    return null; // This component doesn't render anything visible
}