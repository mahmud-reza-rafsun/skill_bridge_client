"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface CardData {
    id: number;
    imageUrl: string;
    title: string;
}

const cardData: CardData[] = [
    {
        id: 1,
        imageUrl: "https://img.freepik.com/free-photo/futuristic-ai-chip-circuit-board_23-2151977487.jpg?semt=ais_hybrid&w=740&q=80",
        title: "AI/ML Engineering",
    },
    {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
        title: "Full Stack Development",
    },
    {
        id: 3,
        imageUrl: "https://thewhitelabelagency.com/wp-content/uploads/2023/09/Artboard-2-2.png",
        title: "Backend Development",
    },
    {
        id: 4,
        imageUrl: "https://qentelli.com/sites/default/files/2024-01/comprehensive-list-of-devops-tools.png",
        title: "DevOps Engineering",
    },
    {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop",
        title: "QA Engineering",
    },
    {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
        title: "Cyber Security",
    },
    {
        id: 7,
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
        title: "Cloud Computing",
    },
    {
        id: 8,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        title: "UI/UX Design",
    },
];

export default function Courses() {
    const [activeIndex, setActiveIndex] = useState(Math.floor(cardData.length / 2));
    const [isPaused, setIsPaused] = useState(false);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoplayDelay = 3000;

    const goToNext = () => setActiveIndex((prev) => (prev + 1) % cardData.length);

    useEffect(() => {
        if (!isPaused) {
            autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [isPaused, activeIndex]);

    const changeSlide = (newIndex: number) => {
        const newSafeIndex = (newIndex + cardData.length) % cardData.length;
        setActiveIndex(newSafeIndex);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        if (!isPaused) autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    };

    const onDragEnd = (event: any, info: PanInfo) => {
        const dragThreshold = 75;
        if (info.offset.x > dragThreshold) changeSlide(activeIndex - 1);
        else if (info.offset.x < -dragThreshold) changeSlide(activeIndex + 1);
    };

    return (
        <section className="w-full flex flex-col items-center justify-center py-20 overflow-hidden">
            {/* 1. Heading Section */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    We <span className="text-orange-500">Offer</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                    Master the most in-demand technical skills with our structured roadmaps. From building complex backends to deploying scalable cloud systems.
                </p>
            </div>

            <div
                className="w-full max-w-6xl mx-auto p-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative flex w-full flex-col rounded-3xl border border-orange-500/10 bg-background/50 backdrop-blur-sm p-4 pt-16 md:p-10">

                    <div className="absolute left-6 top-8 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-sm font-semibold">
                        <Sparkles className="h-4 w-4" />
                        Skill Roadmaps
                    </div>

                    <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden">
                        <motion.div
                            className="w-full h-full flex items-center justify-center"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={onDragEnd}
                        >
                            {cardData.map((card, index) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    index={index}
                                    activeIndex={activeIndex}
                                    totalCards={cardData.length}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Controls with Orange Accent */}
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <button
                            onClick={() => changeSlide(activeIndex - 1)}
                            className="p-3 rounded-full bg-orange-500/5 hover:bg-orange-500/20 border border-orange-500/20 text-orange-500 transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex items-center justify-center gap-2">
                            {cardData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                                        ? "w-8 bg-orange-500"
                                        : "w-2 bg-gray-300 dark:bg-neutral-700"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => changeSlide(activeIndex + 1)}
                            className="p-3 rounded-full bg-orange-500/5 hover:bg-orange-500/20 border border-orange-500/20 text-orange-500 transition-all active:scale-90"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ card, index, activeIndex, totalCards }: any) {
    let offset = index - activeIndex;
    if (offset > totalCards / 2) offset -= totalCards;
    else if (offset < -totalCards / 2) offset += totalCards;

    const isVisible = Math.abs(offset) <= 2;

    return (
        <motion.div
            className="absolute w-[70%] md:w-[30%] h-[90%]"
            animate={{
                x: `${offset * 105}%`,
                scale: offset === 0 ? 1 : 0.85,
                zIndex: totalCards - Math.abs(offset),
                opacity: isVisible ? 1 : 0,
                rotateY: offset * 10,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            <div className="relative w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
                <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                            {card.title}
                        </h4>
                        <div className="w-10 h-1 bg-orange-500 mt-2 rounded-full" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}