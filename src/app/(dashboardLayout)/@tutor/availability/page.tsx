"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { AvailabilityCard } from "./AvailabilityCard";

const daysOfWeek = [
    "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
];

export default function AvailabilityPage() {
    const [availability, setAvailability] = useState(
        daysOfWeek.reduce((acc, day) => {
            acc[day] = { startTime: "09:00", endTime: "17:00", active: true };
            return acc;
        }, {} as Record<string, { startTime: string; endTime: string; active: boolean }>)
    );

    const handleTimeChange = (day: string, field: "startTime" | "endTime", value: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const activeData = Object.fromEntries(
            Object.entries(availability).filter(([_, v]) => v.active)
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0 space-y-4">
                            {daysOfWeek.map((day) => (
                                <AvailabilityCard
                                    key={day}
                                    day={day}
                                    startTime={availability[day].startTime}
                                    endTime={availability[day].endTime}
                                    isActive={availability[day].active}
                                    onTimeChange={handleTimeChange}
                                />
                            ))}
                        </CardContent>
                    </Card>
                    <div className="sticky">
                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-5 text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex gap-3">
                            <Save size={24} />
                            Save Schedule
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}