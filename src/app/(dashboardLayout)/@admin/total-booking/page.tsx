import { TableRow, TableCell } from "@/components/ui/table"
import { adminService } from "@/service/admin.service";
import BookingTable from "./BookingTable";
import { Button } from "@/components/ui/button";

export default async function GetAllBooking() {
    const { data: bookings = [] } = await adminService.getTotalBooking();

    return (
        <div className="container mx-auto">
            <BookingTable>
                {bookings?.map((booking: any) => (
                    <TableRow key={booking.id} className="dark:border-gray-500">
                        <TableCell>
                            <div className="font-medium">{booking.student?.name}</div>
                            <div className="text-xs text-gray-500">{booking.student?.email}</div>
                        </TableCell>

                        <TableCell className="font-medium text-indigo-500 dark:text-blue-400">
                            {booking.tutor?.user?.name}
                        </TableCell>

                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {booking.tutor?.subject?.map((sub: string) => (
                                    <span
                                        key={sub}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 ">
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </TableCell>

                        <TableCell className="">
                            ${booking.totalAmmount}
                        </TableCell>

                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'CONFIRMED'
                                ? 'bg-green-100 text-green-500'
                                : 'bg-orange-100 text-orange-700'
                                }`}>
                                {booking.status}
                            </span>
                        </TableCell>

                        <TableCell className="text-right">
                            <Button className="bg-black rounded-xl cursor-pointer text-white dark:bg-white dark:text-black px-3 py-1 transition">
                                Details
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </BookingTable>
        </div>
    )
}