import { env } from "@/env";
import { cookies } from "next/headers";


const AUTH_URL = env.AUTH_URL
const BACKEND_URL = env.BACKEND_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            console.log("Sending Cookies to Backend:", allCookies);

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Backend Response Error:", errorText);
                return { data: null, error: "Failed to fetch session" };
            }

            const session = await res.json();
            return { data: session, error: null };
        } catch (err) {
            console.error("Connection Error:", err);
            return { data: null, error: "Something Went Wrong" };
        }
    },
    updateUserStatus: async (userId: string) => {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${BACKEND_URL}/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                body: JSON.stringify({ status }),
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: result.message || "Failed to update user status",
                };
            }

            return { success: true, data: result };
        } catch (err) {
            console.error("PATCH Error:", err);
            return { success: false, message: "Internal Server Error" };
        }
    },
};