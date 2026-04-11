"use client";

import { BookingModalProps } from "@/types/tutor.booking";
import { X, CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createBookingAction } from "./BookingModalAction";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [date, setDate] = useState<Date | undefined>();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date) {
            toast.error("Please select a date first!");
            return;
        }

        setIsSubmitting(true);
        try {
            // টাইমজোন ফিক্স করার জন্য তারিখের সময় ১২টায় সেট করা হচ্ছে
            const localDate = new Date(date);
            localDate.setHours(12, 0, 0, 0);
            const dateString = localDate.toISOString();

            const res = await createBookingAction(
                tutor.id,
                Number(tutor.hourlyRate),
                dateString
            );

            if (res.success) {
                toast.success(`Booking confirmed for ${format(date, "PPP")}!`);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="bg-white dark:bg-zinc-950 w-full max-w-sm rounded-xl p-6 relative shadow-xl border border-zinc-200 dark:border-zinc-800">

                <button onClick={onClose} type="button" className="absolute right-4 top-4 p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Confirm Booking</h2>
                    <p className="text-zinc-500 text-xs font-light mt-1">Select a date to schedule your session.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Popover>
                            <PopoverTrigger>
                                <div
                                    className={cn(
                                        "flex items-center w-full h-11 px-4 text-left font-normal rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all",
                                        !date && "text-zinc-400"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                                    <span className="text-sm">
                                        {date ? format(date, "PPP") : "Pick a date"}
                                    </span>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0 rounded-lg border-zinc-200 dark:border-zinc-800" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => d && setDate(d)}
                                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                    fixedWeeks
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                        <span className="text-xs text-zinc-500 font-light">Total Amount</span>
                        <span className="text-base font-medium text-orange-600">${tutor?.hourlyRate}</span>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Confirm Booking"}
                    </Button>
                </form>
            </div>
        </div>
    );
}