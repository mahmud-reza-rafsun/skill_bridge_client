export const bookingService = {
    createBooking: async (tutorId: string, bookingData: any) => {
        const res = await fetch(`${process.env.BACKEND_URL}/api/bookings/${tutorId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
            credentials: "include"
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || "Booking failed! Please check if you are logged in.");
        }
        return result;
    },

    getMyBookings: async (studentId: string) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/bookings/${studentId}`, {
                method: "GET",
                credentials: "include",
            });

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