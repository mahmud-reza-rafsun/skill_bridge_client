"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

// --- Icons ---
const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-zinc-600 dark:text-zinc-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-500 dark:text-zinc-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-500 dark:text-zinc-400"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);

// --- Validation Schema ---
const registerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    image: z.string().url("Invalid image URL"),
    phone: z.string().min(11, "Enter a valid phone number"),
});

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: "https://example.com/image.png", // Default placeholder
            phone: "",
        },
        validators: { onSubmit: registerSchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating account...");
            try {
                const { error } = await authClient.signUp.email({
                    email: value.email,
                    password: value.password,
                    name: value.name,
                    image: value.image,
                    // Better Auth additional fields usually go here
                    callbackURL: "/register"
                });

                if (error) {
                    toast.error(error.message || "Registration failed", { id: toastId });
                    return;
                }

                toast.success("Account created successfully!", { id: toastId });
                window.location.assign("/dashboard");
            } catch (err) {
                toast.error("An unexpected error occurred", { id: toastId });
            }
        },
    });

    return (
        <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        <UserPlusIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Create an account</h1>
                    <p className="text-sm text-zinc-500">Join Skill Bridge today</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Full Name */}
                    <form.Field name="name">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Rafsun"
                                    className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <form.Field name="email">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type="email"
                                        placeholder="rafsun@example.com"
                                        className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Phone */}
                        <form.Field name="phone">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="01628..."
                                        className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Image URL */}
                    <form.Field name="image">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Profile Image URL</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="https://example.com/image.png"
                                    className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Password</label>
                                <div className="relative">
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500">{String(field.state.meta.errors[0])}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full h-11 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-md font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
                            >
                                {isSubmitting ? "Creating Account..." : "Sign Up"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>

                <p className="text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-zinc-900 dark:text-white font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}