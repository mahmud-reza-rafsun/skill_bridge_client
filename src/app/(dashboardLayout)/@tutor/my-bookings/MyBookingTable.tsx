"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ExternalLink } from 'lucide-react';

interface BookingProps {
    booking: {
        id: string;
        tutorName: string;
        subject: string;
        date: string;
        time: string;
        status: string;
        amount: string;
    };
    index: number;
}

export default function MyBookingRow({ booking, index }: BookingProps) {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-colors border-b border-zinc-100 dark:border-zinc-900 last:border-0"
        >
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xs border border-orange-500/20">
                        {booking.tutorName.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{booking.tutorName}</p>
                        <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                            <Tag size={10} /> {booking.subject}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        <Calendar size={12} className="text-orange-500" /> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <Clock size={12} /> {booking.time}
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">{booking.amount}</span>
            </td>
            <td className="px-6 py-5">
                <span className={`
                    px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                    ${booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : ''}
                    ${booking.status === 'Pending' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' : ''}
                    ${booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : ''}
                `}>
                    {booking.status}
                </span>
            </td>
            <td className="px-6 py-5 text-right">
                <button className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 text-zinc-400 hover:text-orange-500">
                    <ExternalLink size={16} />
                </button>
            </td>
        </motion.tr>
    );
}