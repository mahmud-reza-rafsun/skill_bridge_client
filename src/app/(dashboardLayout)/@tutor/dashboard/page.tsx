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
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// ==============================
// Demo Data
// ==============================
const revenueData = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 18000 },
    { month: "Mar", value: 16000 },
    { month: "Apr", value: 24000 },
    { month: "May", value: 21000 },
    { month: "Jun", value: 28000 },
]

const ordersData = [
    { month: "Jan", value: 240 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 280 },
    { month: "Apr", value: 380 },
    { month: "May", value: 350 },
    { month: "Jun", value: 420 },
]

// ==============================
// Small reusable stat card
// ==============================
function StatCard({
    title,
    value,
    change,
}: {
    title: string
    value: string
    change: string
}) {
    return (
        <Card className="rounded-2xl border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-emerald-600">{change}</p>
            </CardContent>
        </Card>
    )
}

// ==============================
// Main Component
// ==============================
export default function TutorDashboard() {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // 🔥 prevent SSR render
    if (!mounted) return null

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* ================= Stats ================= */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Revenue" value="$360,636" change="+12.5%" />
                <StatCard title="Cost" value="$210,838" change="+8.2%" />
                <StatCard title="Profit" value="$151,810" change="+18.3%" />
                <StatCard title="Orders" value="2,384" change="+5.7%" />
                <StatCard title="Profit Margin" value="42.1%" change="+2.1%" />
            </div>

            {/* ================= Charts ================= */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Revenue */}
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Revenue</CardTitle>
                        <CardDescription>Monthly revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AreaChart
                            width={500}
                            height={250}
                            data={revenueData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="stroke-zinc-200 dark:stroke-zinc-800"
                            />

                            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tickFormatter={(v) => `$${v / 1000}k`}
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="currentColor"
                                strokeWidth={3}
                                fill="url(#rev)"
                            />
                        </AreaChart>
                    </CardContent>
                </Card>

                {/* Orders */}
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Orders</CardTitle>
                        <CardDescription>Monthly order volume</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <BarChart
                            width={500}
                            height={250}
                            data={ordersData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="stroke-zinc-200 dark:stroke-zinc-800"
                            />

                            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis axisLine={false} tickLine={false} fontSize={12} />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="currentColor"
                                radius={[8, 8, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
