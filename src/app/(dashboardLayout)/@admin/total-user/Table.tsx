import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function UserTable({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-md border bg-white dark:bg-black dark:border-gray-500 dark:text-white">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-black dark:border-gray-500">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
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