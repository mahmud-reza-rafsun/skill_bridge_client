import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function BookingTable({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-md border bg-white dark:bg-black dark:border-gray-500 dark:text-white">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-black dark:border-gray-500">
                    <TableRow>
                        <TableHead>Student Info</TableHead>
                        <TableHead>Tutor Name</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </div>
    )
}