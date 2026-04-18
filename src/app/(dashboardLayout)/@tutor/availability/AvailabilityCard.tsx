"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityCardProps {
    day: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    onTimeChange: (day: string, field: "startTime" | "endTime", value: string) => void;
}

export function AvailabilityCard({
    day,
    startTime,
    endTime,
    isActive,
    onTimeChange,
}: AvailabilityCardProps) {
    return (

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Time Inputs */}
            <div className={cn(
                "flex flex-1 items-center gap-3 transition-all duration-500",
                !isActive && "pointer-events-none grayscale"
            )}>
                <div className="relative flex-1 group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                        <Sun size={16} />
                    </div>
                    <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => onTimeChange(day, "startTime", e.target.value)}
                        className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-orange-500 font-medium"
                    />
                </div>

                <div className="h-[2px] w-4 bg-slate-300 dark:bg-slate-700 rounded-full" />

                <div className="relative flex-1 group">

                    <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => onTimeChange(day, "endTime", e.target.value)}
                        className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-orange-500 font-medium"
                    />
                </div>
            </div>
        </div>
    );
}