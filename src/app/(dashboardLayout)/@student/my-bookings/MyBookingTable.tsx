/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";

export default function MyBookingTable({ booking }: { booking: any }) {
    // Date formatting
    const formattedDate = booking.date
        ? format(new Date(booking.date), "MMM dd, yyyy")
        : "N/A";

    return (
        <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Tutor Info */}
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block">
                        {booking.tutor?.user?.name || "Unknown Tutor"}
                    </span>
                    <span className="text-[11px] text-orange-500 font-medium italic">
                        {booking.tutor?.subject || "General Session"}
                    </span>
                </div>
            </td>

            {/* Booking ID */}
            <td className="px-6 py-4">
                <code className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 font-mono">
                    {booking.id.slice(0, 8)}...{booking.id.slice(-4)}
                </code>
            </td>

            {/* Amount */}
            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                ${booking.totalAmount}
            </td>

            {/* Created At */}
            <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                {formattedDate}
            </td>

            {/* Status Badge */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-2 rounded-full gap-1.5 
                    ${booking.status === "PAID"
                        ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                        : 'text-yellow-600 bg-orange-100 dark:bg-orange-900/20 dark:text-yellow-500'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${booking.status === "PAID" ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className='text-[10px] font-bold uppercase tracking-wider'>{booking.status}</span>
                </div>
            </td>
        </tr>
    );
}