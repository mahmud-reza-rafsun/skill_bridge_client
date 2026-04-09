import MyBookingRow from "./MyBookingTable";

const bookings = [
    {
        id: "BK-9021",
        tutorName: "Mahmud Reza",
        subject: "Next.js Mastery",
        date: "24 Oct, 2026",
        time: "10:00 AM",
        status: "Confirmed",
        amount: "$120"
    },
    {
        id: "BK-4432",
        tutorName: "Sara Ahmed",
        subject: "UI/UX Design",
        date: "26 Oct, 2026",
        time: "02:30 PM",
        status: "Pending",
        amount: "$80"
    },
    {
        id: "BK-1102",
        tutorName: "Rakibul Islam",
        subject: "Prisma & SQL",
        date: "28 Oct, 2026",
        time: "11:00 AM",
        status: "Cancelled",
        amount: "$45"
    }
];

export default function BookingsPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-black p-4 md:p-8">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-gray-900 font-bold tracking-tighter text-zinc-900 dark:text-white leading-none">
                            My <span className="text-orange-500">Bookings</span>
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-4 font-medium text-sm">
                            Manage your upcoming learning sessions and track your history.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Schedule</span>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="relative group overflow-hidden bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 ">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Tutor / Subject</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Schedule</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Amount</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                                {bookings.map((booking, index) => (
                                    <MyBookingRow
                                        key={booking.id}
                                        booking={booking}
                                        index={index}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}