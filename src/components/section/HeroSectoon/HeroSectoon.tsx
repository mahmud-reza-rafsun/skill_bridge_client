"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background px-4">

            {/* Background Decorative Glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Minimal Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-orange-500/10 mb-6 transition-all hover:border-orange-500/30">
                        <Sparkles className="size-3.5 text-orange-500" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase text-muted-foreground">
                            Learn without limits
                        </span>
                    </div>

                    {/* Clean & Balanced Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.2] mb-6">
                        Build your future with <br />
                        <span className="text-orange-500">Skill Bridge</span>
                    </h1>

                    {/* Professional Subtext */}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
                        Connect with global mentors and master new skills.
                        A premium learning experience designed to help you grow
                        beyond boundaries.
                    </p>

                    {/* Actions - Matching Navbar Style */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="h-12 px-8 rounded-full text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 border-none transition-all hover:scale-105 active:scale-95 group">
                            <Link href="/register" className="flex items-center gap-2">
                                Start Learning
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button asChild size="lg" variant="ghost" className="h-12 px-8 rounded-full text-sm font-semibold hover:bg-orange-500/10 hover:text-orange-500 transition-colors border border-transparent hover:border-orange-500/20">
                            <Link href="/about">Our Vision</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
};