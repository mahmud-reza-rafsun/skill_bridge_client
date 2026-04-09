"use client";

import { BookingModalProps } from "@/types/tutor.booking";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createBookingAction } from "./BookingModalAction";

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const tutorProfileId = tutor.id;
        const amount = Number(tutor.hourlyRate);

        try {
            const res = await createBookingAction(tutorProfileId, amount);

            if (res.success) {
                toast.success("Booking confirmed successfully!");
                onClose();
            } else {
                toast.error(res.error || "Failed to book");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl border border-zinc-200 dark:border-zinc-800">

                <button onClick={onClose} className="absolute right-6 top-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-black mb-1">Book This Tutor</h2>
                <p className="text-zinc-500 text-sm mb-6">Rate: <span className="text-orange-600 font-bold">${tutor?.hourlyRate}/hr</span></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold">Total Amount:</span>
                            <span className="text-xl font-black text-orange-600">${tutor?.hourlyRate}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </div>
    );
}