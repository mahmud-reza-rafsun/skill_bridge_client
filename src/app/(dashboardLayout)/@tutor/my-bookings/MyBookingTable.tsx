/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";
import { Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MyBookingTableProps {
    booking: any;
    onAction?: (id: string, action: 'APPROVE' | 'CANCEL' | 'DELETE') => void;
}

export default function MyBookingTable({ booking, onAction }: MyBookingTableProps) {
    const formattedDate = booking.date
        ? format(new Date(booking.date), "MMM dd, yyyy")
        : "N/A";

    const handleAction = (type: 'APPROVE' | 'CANCEL' | 'DELETE') => {
        if (onAction) {
            onAction(booking.id, type);
        } else {
            toast.info(`${type} action clicked for: ${booking.student?.name}`);
        }
    };

    return (
        <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Student Info */}
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block leading-tight">
                        {booking.student?.name || "Unknown Student"}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium mt-0.5">
                        {booking.student?.email}
                    </span>
                </div>
            </td>

            {/* Booking Date */}
            <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{formattedDate}</span>
                    <span className="text-[10px] text-orange-500/70">Scheduled Time</span>
                </div>
            </td>

            {/* Amount */}
            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                ${booking.totalAmount}
            </td>

            {/* Status Badge */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full gap-1.5 
        ${booking.status === "CONFIRMED" || booking.status === "PAID"
                        ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                        : booking.status === "CANCELLED"
                            ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                            : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500' // PENDING logic
                    }`}>

                    {/* Dot inside Badge */}
                    <span className={`h-1.5 w-1.5 rounded-full 
            ${booking.status === "CONFIRMED" || booking.status === "PAID"
                            ? 'bg-green-500'
                            : booking.status === "CANCELLED"
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                        }`}>
                    </span>

                    {/* Status Text */}
                    <span className='text-xs font-semibold uppercase'>{booking.status}</span>
                </div>
            </td>

            {/* Actions - Fixed Alignment & Styles */}
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => handleAction('APPROVE')}
                        title="Approve"
                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg cursor-pointer transition-all group"
                    >
                        <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={() => handleAction('CANCEL')}
                        title="Cancel"
                        className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg cursor-pointer transition-all group"
                    >
                        <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={() => handleAction('DELETE')}
                        title="Delete"
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg cursor-pointer transition-all group"
                    >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </td>
        </tr>
    );
}