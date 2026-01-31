"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// --- Types ---
interface Tutor {
    id: number;
    name: string;
    role: string;
    email: string;
    profile: string;
}

const useIsMobile = (breakpoint: number = 768): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [breakpoint]);
    return isMobile;
};

export default function OutTutor() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const dummyData: Tutor[] = [
                    { id: 1, name: "Dr. Anisul Islam", role: "Full Stack Lead", email: "anisul@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
                    { id: 2, name: "Sumit Saha", role: "MERN Expert", email: "sumit@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
                    { id: 3, name: "Jhankar Mahbub", role: "Frontend Guru", email: "jhankar@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
                    { id: 4, name: "Hitesh Choudhary", role: "Backend Specialist", email: "hitesh@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
                    { id: 5, name: "Piyush Garg", role: "DevOps Engineer", email: "piyush@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=5" },
                    { id: 6, name: "Love Babbar", role: "DSA Mentor", email: "love@skillbridge.com", profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=6" },
                ];
                setTutors(dummyData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch tutors", error);
            }
        };
        fetchTutors();
    }, []);

    const containerRadius = isMobile ? 140 : 260;
    const profileSize = isMobile ? 60 : 85;
    const containerSize = containerRadius * 2 + 160;

    const getRotation = useCallback(
        (index: number): number => (index - activeIndex) * (360 / tutors.length),
        [activeIndex, tutors.length]
    );

    const next = () => setActiveIndex((i) => (i + 1) % tutors.length);
    const prev = () => setActiveIndex((i) => (i - 1 + tutors.length) % tutors.length);

    if (loading) return <div className="h-[400px] flex items-center justify-center text-orange-500">Loading Tutors...</div>;

    return (
        <section className="flex flex-col items-center py-32 relative min-h-[700px] bg-background overflow-hidden">

            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-orange-500">Mentors</span></h2>
                <p className="text-muted-foreground text-base max-w-lg mx-auto">
                    Learn from industry experts and take your career to the next level with personalized guidance.
                </p>
            </div>

            <div
                className="relative flex items-center justify-center"
                style={{ width: containerSize, height: containerSize }}
            >

                <div
                    className="absolute rounded-full border border-orange-500/10 dark:border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.03)]"
                    style={{
                        width: containerRadius * 2,
                        height: containerRadius * 2,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                {/* Center Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tutors[activeIndex].id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="z-20 bg-card border border-orange-500/10 dark:border-orange-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(249,115,22,0.05)] rounded-[2rem] p-6 w-64 md:w-72 text-center"
                    >
                        <motion.img
                            src={tutors[activeIndex].profile}
                            alt={tutors[activeIndex].name}
                            className="w-24 h-24 rounded-full mx-auto -mt-20 border-8 border-background object-cover bg-orange-100 p-1 shadow-lg"
                        />
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-foreground truncate">{tutors[activeIndex].name}</h3>
                            <div className="flex items-center justify-center text-sm text-orange-500 font-semibold mt-1">
                                <Briefcase size={14} className="mr-1.5" /> {tutors[activeIndex].role}
                            </div>
                            <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                                <Mail size={12} className="mr-1.5" /> {tutors[activeIndex].email}
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-6 space-x-3">
                            <button onClick={prev} className="p-2.5 rounded-full bg-orange-500/5 hover:bg-orange-500/20 text-orange-500 transition-all active:scale-90">
                                <ChevronLeft size={18} />
                            </button>
                            <Link href={`/tutors/${tutors[activeIndex].id}`}>
                                <button className="px-6 py-2 text-sm font-bold rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                                    View Profile
                                </button>
                            </Link>
                            <button onClick={next} className="p-2.5 rounded-full bg-orange-500/5 hover:bg-orange-500/20 text-orange-500 transition-all active:scale-90">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Orbiting Profiles */}
                {tutors.map((t, i) => {
                    const rotation = getRotation(i);
                    return (
                        <motion.div
                            key={t.id}
                            animate={{
                                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                            }}
                            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                            className="absolute"
                            style={{
                                width: profileSize,
                                height: profileSize,
                                top: `calc(50% - ${profileSize / 2}px)`,
                                left: `calc(50% - ${profileSize / 2}px)`,
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -rotation }}
                                transition={{ duration: 1 }}
                                className="w-full h-full relative"
                                onClick={() => setActiveIndex(i)}
                            >
                                <img
                                    src={t.profile}
                                    alt={t.name}
                                    className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-500 border-2 ${i === activeIndex
                                        ? "border-orange-500 scale-125 shadow-xl shadow-orange-500/30 ring-4 ring-orange-500/10"
                                        : "border-orange-500/20 hover:border-orange-500 grayscale hover:grayscale-0 hover:scale-110"
                                        }`}
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}