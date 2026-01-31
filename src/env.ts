import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        BACKEND_URL: z.string(),
        FRONTEND_URL: z.string(),
        APP_URL: z.string(),
        AUTH_URL: z.string(),
    },
    client: {
        NEXT_PUBLIC_TEST: z.string().min(1),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        APP_URL: process.env.APP_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    },
});