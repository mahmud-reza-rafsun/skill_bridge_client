import { cookies } from "next/headers";


interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorParams {
    search?: string;
}

export const tutorService = {
    getAllTutors: async function (
        params?: GetTutorParams,
        options?: ServiceOptions,
    ) {
        try {
            const url = new URL(`${process.env.BACKEND_URL}/api/tutors`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const config: RequestInit = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorResult.message || "Unauthorized access" }
                };
            }
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            console.error("Fetch Error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getTutorById: async function (id: string) {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/${id}`, {
                // ১. নেক্সট জেএস যাতে ক্যাশ ধরে না রাখে (লেটেস্ট ডাটার জন্য)
                cache: "no-store",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // ২. যদি এপিআই থেকে ৪০৪ বা ৫০০ এরর আসে
            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch tutor data" } };
            }

            const data = await res.json();

            // ৩. আপনার ব্যাকএন্ড রেসপন্স যদি { success: true, data: { ... } } ফরম্যাটে হয়
            return { data: data, error: null };

        } catch (err: any) {
            console.error("Fetch Error:", err.message);
            return { data: null, error: { message: err.message || "Something Went Wrong" } };
        }
    },
};
