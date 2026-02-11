import { adminService } from "@/service/admin.service";
import AdminDashboard from "./AdminDashboard";

export default async function DashboardPage() {
    const response = await adminService.getAllStat();
    const dynamicStats = response?.data
    console.log(dynamicStats)

    return (
        <div className="container mx-auto py-6">
            <AdminDashboard {...dynamicStats} />
        </div>
    );
}