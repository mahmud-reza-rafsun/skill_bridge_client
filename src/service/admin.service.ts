
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const adminService = {
    getTotalUser: async function () {
        try {
            const url = `${BACKEND_URL}/api/admin/users`;
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store"
            });
            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorResult.message || "Unauthorized access" }
                };
            }

            const result = await res.json();
            return { data: result.data || result, error: null };

        } catch (err) {
            console.error("Fetch Error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
    updateUserStatus: async (userId: string) => {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_URL}/api/admin/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status: "banned" }),
        });

        const result = await res.json();

        if (!res.ok) {
            console.error("Backend Error:", result);
            return { success: false, message: result.message };
        }

        return { success: true, data: result };
    },
    getTotalBooking: async function () {
        try {
            const url = `${BACKEND_URL}/api/admin/get-all-booking`;
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store"
            });
            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorResult.message || "Unauthorized access" }
                };
            }

            const result = await res.json();
            return { data: result.data || result, error: null };

        } catch (err) {
            console.error("Fetch Error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
    getAllCategories: async function () {
        try {
            const url = `${BACKEND_URL}/api/categories`;
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store"
            });
            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorResult.message || "Unauthorized access" }
                };
            }

            const result = await res.json();
            return { data: result.data || result, error: null };

        } catch (err) {
            console.error("Fetch Error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

};