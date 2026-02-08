"use client";

import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

// --- Configuration & Mock Data ---
const revenueData = [
    { month: "Jan", value: 18600 },
    { month: "Feb", value: 30500 },
    { month: "Mar", value: 23700 },
    { month: "Apr", value: 27300 },
    { month: "May", value: 20900 },
    { month: "Jun", value: 31400 },
];

const ordersData = [
    { month: "Jan", value: 186 },
    { month: "Feb", value: 305 },
    { month: "Mar", value: 237 },
    { month: "Apr", value: 273 },
    { month: "May", value: 209 },
    { month: "Jun", value: 314 },
];

const revenueConfig = {
    value: { label: "Revenue", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const ordersConfig = {
    value: { label: "Orders", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

// --- Main Page Component ---
export default function DashboardPage() {

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {/* Revenue Chart */}
                <Card className="rounded-[2rem] border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Revenue</CardTitle>
                        <CardDescription>Monthly revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={revenueConfig} className="h-72 w-full">
                            <AreaChart
                                data={revenueData}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-100 dark:stroke-zinc-800" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="var(--color-value)"
                                    strokeWidth={3}
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Orders Chart */}
                <Card className="rounded-[2rem] border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Orders</CardTitle>
                        <CardDescription>Monthly order volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={ordersConfig} className="h-72 w-full">
                            <BarChart
                                data={ordersData}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-100 dark:stroke-zinc-800" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="value"
                                    fill="var(--color-value)"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}