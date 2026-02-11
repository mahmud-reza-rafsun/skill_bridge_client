"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StatsData } from "@/types/admin.stat"

const statsData = {
    totalUsers: 6,
    totalStudents: 1,
    totalTutors: 3,
    totalBookings: 5,
    totalReviews: 0,
    totalRevenue: 15407
}

const chartData = [
    { name: "Users", value: statsData.totalUsers },
    { name: "Students", value: statsData.totalStudents },
    { name: "Tutors", value: statsData.totalTutors },
    { name: "Bookings", value: statsData.totalBookings },
]

function StatCard({
    title,
    value,
    subtitle,
}: {
    title: string
    value: string | number
    subtitle: string
}) {
    return (
        <Card className="rounded-2xl border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
                <CardDescription className="font-medium">{title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    )
}

export default function AdminDashboard(props: StatsData) {
    console.log(props)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex-1 space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${statsData.totalRevenue}`}
                    subtitle="Lifetime earnings"
                />
                <StatCard
                    title="Total Users"
                    value={statsData.totalUsers}
                    subtitle={`${statsData.totalStudents} Students & ${statsData.totalTutors} Tutors`}
                />
                <StatCard
                    title="Bookings"
                    value={statsData.totalBookings}
                    subtitle="Total lessons booked"
                />
                <StatCard
                    title="Reviews"
                    value={statsData.totalReviews}
                    subtitle="Platform feedback"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Platform Overview - Orange Theme */}
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Platform Overview</CardTitle>
                        <CardDescription>Distribution of users and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    className="stroke-orange-200 dark:stroke-orange-900/30"
                                />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip
                                    cursor={{ fill: '#FF6900', opacity: 0.1 }}
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#FF6900"
                                    radius={[8, 8, 0, 0]}
                                    barSize={50}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue Analytics - Orange Area Chart */}
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Revenue Analytics</CardTitle>
                        <CardDescription>Visualizing total earnings impact</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={[
                                    { day: "Sun", val: 2000 },
                                    { day: "Mon", val: 5000 },
                                    { day: "Tue", val: 4000 },
                                    { day: "Wed", val: 8000 },
                                    { day: "Thu", val: statsData.totalRevenue },
                                ]}
                            >
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6900" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#FF6900" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    className="stroke-orange-200 dark:stroke-orange-900/30"
                                />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#FF6900"
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    strokeWidth={4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}