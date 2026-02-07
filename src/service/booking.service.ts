export const bookingService = {
    createBooking: async (tutorId: string, bookingData: any) => {
        const res = await fetch(`http://localhost:5000/api/bookings/${tutorId}`, {
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
    }
};