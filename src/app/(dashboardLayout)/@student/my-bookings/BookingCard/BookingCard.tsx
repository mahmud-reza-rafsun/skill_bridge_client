import { BookingCardProps } from "@/types/tutor.booking";
import { Calendar, Clock, DollarSign } from "lucide-react";

export default function BookingCard({ booking }: BookingCardProps) {
    const date = new Date(booking.startTime).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
    });

    const time = new Date(booking.startTime).toLocaleTimeString([], {
        hour: "2-digit", minute: "2-digit",
    });

    const isCompleted = booking.status === 'COMPLETED';

    return (
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-orange-500/20 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                {/* Tutor info */}
                <div className="flex-1">
                    <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-2 uppercase tracking-tight">
                        {booking.tutorId?.name || "Private Tutor"}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm font-bold text-zinc-500">
                        <div className="flex items-center gap-1.5 text-orange-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.startTime).toLocaleDateString('en-GB')}
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                            <Clock className="w-4 h-4 text-orange-500" />
                            {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>

                {/* Amount */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-3 rounded-2xl flex flex-col justify-center border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Total Paid</span>
                    <div className="text-2xl font-black text-zinc-900 dark:text-white flex items-center">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        {booking.totalAmmount}
                    </div>
                </div>

                {/* Status Badge */}
                <div className="lg:ml-4">
                    <span className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-tighter border ${booking.status === 'CONFIRMED'
                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                        }`}>
                        {booking.status}
                    </span>
                </div>
            </div>
        </div>
    );
}