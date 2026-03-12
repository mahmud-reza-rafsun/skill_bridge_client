"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TutorBookingTable } from "./TutorBookingTable";
import { studentService } from "@/service/student.service";

export default function BookingsPage() {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await studentService.getIncomingBookings();
                setStudent(data);
            } catch (error: any) {
                toast.error(error.message || "Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="p-6 md:p-12 min-h-screen">
            <div className="max-w-8xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-black italic dark:text-white">
                        My <span className="text-orange-500">Students</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage all incoming tuition requests from this dashboard.</p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <TutorBookingTable data={student} />
                )}
            </div>
        </div>
    );
}