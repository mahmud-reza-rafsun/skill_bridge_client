/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const bookingService = {
    createBookings: async function (tutorId: string, totalAmount: number) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/bookings/${tutorId}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    totalAmount: totalAmount,
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create booking");

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("❌ API Fetch Error:", error.message);
            return { success: false, error: error.message || "Network Error" };
        }
    },
    getMyBookings: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/bookings/get-my-booking`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) {
                console.error("Fetch failed:", result.message);
                return { data: [], error: result.message || "Failed to fetch" };
            }

            return { data: result.data || [], error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
};