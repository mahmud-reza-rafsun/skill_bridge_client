"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { becomeATutorSerive } from "@/service/become.tutor.service";
import { toast } from "sonner";

export default function BecomeTutor() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState({
        saturday: ["", ""],
        sunday: ["", ""],
        monday: ["", ""],
    });

    const handleTimeChange = (day: string, index: number, value: string) => {
        setAvailability((prev: any) => ({
            ...prev,
            [day]: prev[day].map((t: string, i: number) => (i === index ? value : t)),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const finalData = {
            categoryName: formData.get("categoryName") as string,
            bio: formData.get("bio") as string,
            hourlyRate: Number(formData.get("hourlyRate")),
            subject: (formData.get("subjects") as string)
                .split(",")
                .map(s => s.trim())
                .filter(s => s !== ""),
            availability: availability
        };

        try {
            console.log("Submitting Data:", finalData);

            const res = await becomeATutorSerive.becomeTutor(finalData);

            if (res) {
                toast("Success! Application Submitted.");
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.error("Error:", error);
            toast(`Error: ${error.message || "Something went wrong"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl mt-10 mb-20">
            <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-zinc-50 italic">Become a <span className="text-orange-500">Tutor</span> </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category Name</label>
                    <input
                        name="categoryName"
                        type="text"
                        required
                        placeholder="e.g. Web Development"
                        className="flex h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 text-sm outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
                    />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Bio</label>
                    <textarea
                        name="bio"
                        required
                        placeholder="Tell students about your experience..."
                        className="flex min-h-[100px] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-4 text-sm outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hourly Rate */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hourly Rate ($)</label>
                        <input
                            name="hourlyRate"
                            type="number"
                            required
                            placeholder="30"
                            className="flex h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 text-sm outline-none focus:ring-1 focus:ring-zinc-400"
                        />
                    </div>

                    {/* Subjects */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subjects (comma separated)</label>
                        <input
                            name="subjects"
                            type="text"
                            required
                            placeholder="Next.js, Tailwind, Prisma"
                            className="flex h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 text-sm outline-none focus:ring-1 focus:ring-zinc-400"
                        />
                    </div>
                </div>

                {/* Availability Section */}
                <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Availability Slots</h3>

                    {['saturday', 'sunday', 'monday'].map((day) => (
                        <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-2xl">
                            <span className="w-24 text-xs font-black uppercase text-zinc-500">{day}</span>
                            <div className="flex flex-1 items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="10AM"
                                    value={availability[day as keyof typeof availability][0]}
                                    onChange={(e) => handleTimeChange(day, 0, e.target.value)}
                                    className="flex-1 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <span className="text-zinc-400 text-[10px]">to</span>
                                <input
                                    type="text"
                                    placeholder="4PM"
                                    value={availability[day as keyof typeof availability][1]}
                                    onChange={(e) => handleTimeChange(day, 1, e.target.value)}
                                    className="flex-1 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-orange-500 dark:bg-orange-550 text-zinc-50 dark:text-zinc-900 font-black py-4 rounded-2xl hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs shadow-lg"
                >
                    {loading ? "Submitting..." : "Apply as a Tutor"}
                </button>
            </form>
        </div>
    );
}