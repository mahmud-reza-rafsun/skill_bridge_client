"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TutorCard } from '@/components/modules/tutorCard/TutorCard';

export default function TutorPage() {
    const [search, setSearch] = useState("");

    const tutors = [
        {
            id: 1,
            categoryName: "AI/ML Engineering",
            bio: "I am a professional Web Developer with 5 years of experience in React and Node.js.",
            hourlyRate: 35.50,
            subject: ["React", "Node.js"],
            availability: {
                saturday: ["10:00 AM", "04:00 PM"],
                sunday: ["02:00 PM", "08:00 PM"],
                monday: ["09:00 AM", "01:00 PM"]
            }
        },

    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">

                {/* Header Section: Title & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            <span className="text-black dark:text-white">T</span>
                            <span className="text-orange-500">utors</span>
                        </h1>
                        <p className="text-muted-foreground mt-2">Find the best mentors for your journey</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="Search by subject or category..."
                            className="pl-10 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutors.map((tutor, index) => (
                        <TutorCard key={index} tutor={tutor} />
                    ))}
                </div>

                {tutors.length === 0 && (
                    <div className="text-center py-20 text-zinc-500">
                        No tutors found at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}