import { TableRow, TableCell } from "@/components/ui/table"
import UserTable from "./Table";
import { adminService } from "@/service/admin.service";
import ActionButton from "./ActionButton";

export default async function UsersPage() {
    const { data: totalUsers = [] } = await adminService.getTotalUser();

    return (
        <div className="container mx-auto">
            <UserTable>
                {totalUsers?.map((user: any) => (
                    <TableRow key={user.id} className="dark:border-gray-500">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell className="capitalize">{user.status}</TableCell>
                        <TableCell className="text-right">
                            <ActionButton userId={user.id} currentStatus={""} />
                        </TableCell>
                    </TableRow>
                ))}
            </UserTable>
        </div>
    )
}