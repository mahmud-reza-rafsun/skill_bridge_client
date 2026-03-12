export const bookingService = {
    createBooking: async (tutorId: string, bookingData: any) => {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        try {
            const res = await fetch(`${baseUrl}/api/bookings/${tutorId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
                credentials: "include"
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned an invalid response (HTML instead of JSON). Check your API URL.");
            }

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Booking failed! Please check if you are logged in.");
            }

            return result;

        } catch (error: any) {
            console.error("Booking Service Error:", error);
            throw error;
        }
    },

    getMyBookings: async (studentId: string) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

            const res = await fetch(`${baseUrl}/api/bookings/${studentId}`, {
                method: "GET",
                credentials: "include",
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error("Received non-JSON response");
                throw new Error("Server is not Responsed");
            }

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch bookings");
            }

            return result.data || result;

        } catch (error: any) {
            console.error("Fetch error:", error);
            throw error;
        }
    }
};