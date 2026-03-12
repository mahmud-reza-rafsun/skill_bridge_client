"use client";

import React, { useState } from "react";
import { toast } from "sonner"; // আপনি sonner ব্যবহার করছেন স্ক্রিনশট অনুযায়ী

export default function UpdateAvailability() {
    const [loading, setLoading] = useState(false);

    // Availability স্টেট
    const [availability, setAvailability] = useState<Record<string, string[]>>({
        saturday: ["", ""],
        sunday: ["", ""],
        monday: ["", ""],
    });

    const handleTimeChange = (day: string, index: number, value: string) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: prev[day].map((t, i) => (i === index ? value : t)),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // আপনার এপিআই কল লজিক এখানে হবে
            console.log("Updated Availability:", availability);

            // সাকসেস মেসেজ
            toast.success("Availability updated successfully!");
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-[#0a0a0a] rounded-[2rem] border border-zinc-900 shadow-2xl mt-10">
            <h2 className="text-3xl font-black mb-10 text-white tracking-tight">
                Update <span className="text-orange-500 italic">Availability</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
                        Availability Slots
                    </h3>

                    {Object.keys(availability).map((day) => (
                        <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="w-24 text-[11px] font-black uppercase text-zinc-400">
                                {day}
                            </span>

                            <div className="flex flex-1 items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="10AM"
                                    value={availability[day][0]}
                                    onChange={(e) => handleTimeChange(day, 0, e.target.value)}
                                    className="flex-1 h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 text-sm text-zinc-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all"
                                />
                                <span className="text-zinc-600 text-xs font-medium">to</span>
                                <input
                                    type="text"
                                    placeholder="5PM"
                                    value={availability[day][1]}
                                    onChange={(e) => handleTimeChange(day, 1, e.target.value)}
                                    className="flex-1 h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 text-sm text-zinc-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 cursor-pointer bg-orange-600 hover:bg-orange-700 text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                >
                    {loading ? "Submitting..." : "Update Availability"}
                </button>
            </form>
        </div>
    );
}