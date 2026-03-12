export const studentService = {
    getIncomingBookings: async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        try {
            const res = await fetch(`${baseUrl}/api/tutors/my-students`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid response from server (HTML instead of JSON)");
            }

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch data");

            return result.data;
        } catch (error: any) {
            console.error("Client Fetch Error:", error.message);
            throw error;
        }
    },
};
