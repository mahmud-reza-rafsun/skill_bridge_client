export const becomeATutorSerive = {
    becomeTutor: async (finalData: any) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
            const res = await fetch(`${baseUrl}/api/tutors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
                credentials: "include",
            });
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON response. Check your API URL.");
            }

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to submit tutor application");
            }
            return result;
        } catch (error: any) {
            console.error("Tutor Service Error:", error);
            throw error;
        }
    }
}