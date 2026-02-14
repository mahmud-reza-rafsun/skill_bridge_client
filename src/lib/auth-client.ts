import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://skill-bridge-back-end.vercel.app/api/auth",
    fetchOptions: {
        credentials: "include",
    },
});
