"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

// --- Icons ---
const LogInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-zinc-600 dark:text-zinc-400"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-500 dark:text-zinc-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-500 dark:text-zinc-400"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
);

// --- Validation Schema ---
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "http://localhost:3000",
            });
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    const form = useForm({
        defaultValues: { email: "", password: "" },
        validators: { onSubmit: loginSchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in...");
            try {
                const { error } = await authClient.signIn.email({
                    email: value.email,
                    password: value.password,
                    rememberMe: true,
                });

                if (error) {
                    toast.error(error.message || "Invalid credentials", { id: toastId });
                    return;
                }

                toast.success("Logged in successfully", { id: toastId });
                // Redirect for session sync
                window.location.href = "/";
            } catch (err) {
                toast.error("An unexpected error occurred", { id: toastId });
            }
        },
    });

    return (
        <div className="w-full flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        <LogInIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
                    <p className="text-sm text-zinc-500">Sign in to your account to continue</p>
                </div>

                {/* Social Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all font-medium text-sm">
                    <GoogleIcon /> Continue with Google
                </button>

                <div className="relative flex items-center justify-center">
                    <span className="absolute w-full border-t border-zinc-200 dark:border-zinc-800" />
                    <span className="relative bg-white dark:bg-black px-3 text-xs text-zinc-400 uppercase">Or continue with email</span>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Email */}
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-[12px] text-red-500 font-medium">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Password</label>
                                    <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-[12px] text-red-500 font-medium">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Submit Button */}
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full h-11 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-md font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center mt-2"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign In"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>

                <p className="text-center text-sm text-zinc-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-zinc-900 dark:text-white font-bold hover:underline">Create account</Link>
                </p>
            </div>
        </div>
    );
}