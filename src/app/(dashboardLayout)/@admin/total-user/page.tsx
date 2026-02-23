import { TableRow, TableCell } from "@/components/ui/table"
import UserTable from "./Table";
import { adminService } from "@/service/admin.service";
import ActionButton from "./ActionButton";

export default async function UsersPage() {
    let totalUsers = [];

    try {
        const response = await adminService.getTotalUser();
        totalUsers = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
    } catch (error) {
        console.error("Error fetching users:", error);
    }

    return (
        <div className="container mx-auto py-10">
            <UserTable>
                {totalUsers.length > 0 ? (
                    totalUsers.map((user: any) => (
                        <TableRow key={user.id || user._id} className="dark:border-gray-500">
                            <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="capitalize">{user.role}</TableCell>
                            <TableCell className="capitalize">{user.status}</TableCell>
                            <TableCell className="text-right">
                                <ActionButton userId={user.id} currentStatus={user.status || "ACTIVE"} />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                            No users found.
                        </TableCell>
                    </TableRow>
                )}
            </UserTable>
        </div>
    )
}