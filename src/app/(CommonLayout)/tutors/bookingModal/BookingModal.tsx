"use client";

import { BookingModalProps } from "@/types/tutor.booking";
import { X, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createBookingAction } from "./BookingAction";

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    if (!isOpen) return null;

    const availabilitySlots = tutor.availability?.slots || {};
    const slotsArray = Object.entries(availabilitySlots);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDay) {
            toast.error("Please select a day to schedule!");
            return;
        }

        setIsSubmitting(true);

        try {
            const slotDetails = availabilitySlots[selectedDay];
            if (!slotDetails) {
                throw new Error("Slot details not found for the selected day.");
            }
            const timeRangeSlot: string = `${slotDetails.startTime} - ${slotDetails.endTime}`;
            const tutorId: string = tutor.id;
            const totalAmount: number = Number(tutor.hourlyRate);

            const res = await createBookingAction(
                tutorId,
                totalAmount,
                selectedDay,
                timeRangeSlot
            );

            if (res.success) {
                toast.success(`Booking request sent for ${selectedDay} at ${timeRangeSlot}!`);
                onClose();
            } else {
                toast.error(res.error || "Failed to create booking");
            }
        } catch (err: any) {
            console.error("Booking Error:", err);
            toast.error(err.message || "Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-[2rem] p-8 relative shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all">

                <button
                    onClick={onClose}
                    type="button"
                    className="absolute right-6 top-6 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-900 rounded-full"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight">Select your slot</h2>
                    <p className="text-zinc-500 text-sm font-medium mt-1">
                        Available days for <span className="text-orange-600">@{tutor.user?.name.split(' ')[0]}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {slotsArray.length > 0 ? (
                            slotsArray.map(([day, details]: any) => (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={cn(
                                        "relative flex flex-col items-start p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200",
                                        selectedDay === day
                                            ? "border-orange-500 bg-orange-50/50 dark:bg-orange-500/10 shadow-md shadow-orange-100 dark:shadow-none"
                                            : "border-zinc-100 dark:border-zinc-800 hover:border-orange-200"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full mb-1">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{day}</span>
                                        {selectedDay === day && (
                                            <CheckCircle2 className="text-orange-600 w-4 h-4 animate-in zoom-in" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                                        <Clock size={12} className="text-orange-500" />
                                        {details.startTime} - {details.endTime}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-2 text-center py-10 text-zinc-400 italic">No available slots found.</p>
                        )}
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-orange-600 dark:text-orange-400 font-black uppercase tracking-widest">Rate per Session</span>
                            <span className="text-xl font-black text-orange-700 dark:text-orange-300">${tutor?.hourlyRate}</span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !selectedDay}
                            className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold px-8 h-12 shadow-lg shadow-orange-200 dark:shadow-none transition-transform active:scale-95"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Book Now"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}