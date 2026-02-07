"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";
import { TutorProps } from "@/types/tutor.types";
import { useState } from "react";
import BookingModal from "@/app/(CommonLayout)/tutors/bookingModal/BookingModal";


export function TutorCard({ tutor }: TutorProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const days = Object.keys(tutor.availability);

    return (
        <Card className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300">
            <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                    <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none">
                        {tutor.categoryName}
                    </Badge>
                    <div className="text-lg font-bold text-orange-500">
                        ${tutor.hourlyRate.toFixed(2)}<span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold dark:text-zinc-100">{tutor?.categoryName}</h3>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tutor.subject.map((s) => (
                        <span key={s} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-600 dark:text-zinc-400 font-medium">
                            {s}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="w-3 h-3 text-orange-500" />
                    <span className="capitalize">
                        Available: {tutor?.availability && Object.keys(tutor.availability).length > 0
                            ? Object.keys(tutor.availability).map(day => day.slice(0, 3)).join(", ")
                            : "Not Scheduled"}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-none">
                    Book Now
                </Button>
                <Link href={`/tutors/${tutor.id}`}>
                    <Button variant="outline" className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                        Details
                    </Button>
                </Link>
            </CardFooter>
            <BookingModal
                tutor={tutor}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Card>
    );
}