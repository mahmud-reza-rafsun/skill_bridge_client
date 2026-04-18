/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function BookingRow({ order }: { order: any }) {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Student Info */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.student?.name}</p>
                    <p className="text-xs text-gray-500">{order.student?.email}</p>
                </div>
            </td>

            {/* Tutor Info */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.tutor?.user?.name}</p>
                    <p className="text-xs text-gray-500">{order.tutor?.user.email}</p>
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(order.date), "MMM dd, yyyy")}
            </td>

            {/* Price */}
            <td className="px-6 py-4 text-sm font-bold text-orange-600 dark:text-orange-500">
                ${order.totalAmount}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                    ${order.status === "PENDING"
                        ? 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400'
                        : 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full 
                        ${order.status === "PENDING" ? 'bg-orange-500' : 'bg-green-500'}`}>
                    </span>
                    <h2 className='text-xs font-medium uppercase'>{order.status}</h2>
                </div>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">
                    <button
                        className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}