"use client";

import { useEffect, useState } from "react";
import { bookingService } from "@/service/booking.service";
import { authClient } from "@/lib/auth-client";
import BookingCard from "./BookingCard/BookingCard";

export default function MyBookings() {
    const { data: session } = authClient.useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const studentId = session?.user?.id;

    useEffect(() => {
        if (studentId) {
            const fetchBookings = async () => {
                try {
                    const data = await bookingService.getMyBookings(studentId);
                    setBookings(data || []);
                } catch (err) {
                    console.error("Failed to load bookings", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchBookings();
        }
    }, [studentId]);

    if (loading) {
        return <div className="p-10 text-center font-bold">Loading bookings...</div>;
    }

    return (
        <div className="">
            {bookings.map((booking: any) => (
                <BookingCard
                    key={booking._id || booking.id}
                    booking={booking}
                />
            ))}
        </div>
    );
}