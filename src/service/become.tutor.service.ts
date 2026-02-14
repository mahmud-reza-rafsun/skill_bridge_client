export const becomeATutorSerive = {
    becomeTutor: async (finalData: any) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
                credentials: "include",
            });
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