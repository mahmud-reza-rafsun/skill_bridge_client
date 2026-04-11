/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import AdminDashboard from "./AdminDashboard";

export default async function DashboardPage() {
    // API থেকে ডাটা ফেচ করা হচ্ছে
    const response = await adminService.getAdminStat();
    const dynamicStats = response?.data;

    return (
        <div className="container mx-auto py-6">
            {/* ডাটা স্প্রেড করে পাঠানো হচ্ছে */}
            {dynamicStats && <AdminDashboard {...dynamicStats} />}
        </div>
    );
}