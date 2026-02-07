"use client";

import { BookingModalProps } from "@/types/tutor.booking";
import { X } from "lucide-react";
import BookingData from "./BookingData";

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const bookingData = {
            tutorId: tutor.id || tutor._id,

            startTime: new Date(formData.get("startTime") as string).toISOString(),
            endTime: new Date(formData.get("endTime") as string).toISOString(),
            totalAmmount: Number(tutor.hourlyRate),
            status: "CONFIRMED",
        };

        console.log("Final Booking Payload:", bookingData);

        // API Call Example:
        // await bookingService.createBooking(bookingData);


        alert("Booking CONFIRMED successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">

                <button onClick={onClose} className="absolute right-6 top-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-black mb-1">Book a Session</h2>
                <p className="text-zinc-500 text-sm mb-6">Rate: <span className="text-orange-600 font-bold">${tutor?.hourlyRate}/hr</span></p>

                <form onSubmit={handleSubmit} className="space-y-4">


                    {/* Time Slots */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Start Time</label>
                            <input name="startTime" type="datetime-local" required className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest ml-1">End Time</label>
                            <input name="endTime" type="datetime-local" required className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Price Summary Display */}
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold">Total Amount:</span>
                            <span className="text-xl font-black text-orange-600">${tutor?.hourlyRate}</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-95">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}