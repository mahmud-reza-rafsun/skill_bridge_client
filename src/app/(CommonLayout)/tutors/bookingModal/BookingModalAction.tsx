/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { bookingService } from "@/service/booking.service";
import { revalidatePath } from "next/cache";

export async function createBookingAction(tutorId: string, hourlyRate: number) {
    try {
        const res = await bookingService.createBookings(tutorId, hourlyRate);

        if (res.success) {
            revalidatePath("/my-bookings");
            revalidatePath("/tutors");

            return {
                success: true,
                message: "Booking confirmed successfully!",
                data: res.data
            };
        }

        return {
            success: false,
            error: res.error || "Failed to confirm booking"
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An unexpected error occurred"
        };
    }
}