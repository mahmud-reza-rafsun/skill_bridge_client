// components/TutorBookingTable.tsx
import React from "react";

interface Student {
    name: string;
    email: string;
}

interface Booking {
    id: string;
    student: Student;
    status: string;
    createdAt: string;
}

export const TutorBookingTable = ({ data }: { data: Booking[] }) => {
    return (
        <div className="overflow-x-auto rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-950 p-5">
            <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 uppercase text-[10px] font-black tracking-widest">
                    <tr>
                        <th className="px-6 py-5">Student Name</th>
                        <th className="px-6 py-5">Email Address</th>
                        <th className="px-6 py-5">Booking Status</th>
                        <th className="px-6 py-5">Applied Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="">
                                <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100 italic">
                                    {item.student?.name || "Unknown Student"}
                                </td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{item.student?.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${item.status === 'CONFIRMED' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-400 text-xs">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-20 text-center text-zinc-400 italic">
                                No students found in your booking list.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};