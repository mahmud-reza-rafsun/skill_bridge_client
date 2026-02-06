import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            console.log("Sending Cookies to Backend:", allCookies);

            const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
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
};