import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const apiGet = async <T>(url: string, session: Session): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return redirect(DEFAULT_LOGIN_REDIRECT);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};
