'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiTarget, FiAward } from 'react-icons/fi';

const stats = [
    { label: 'Active Students', value: '10K+', icon: <FiUsers className="text-orange-500" /> },
    { label: 'Expert Mentors', value: '150+', icon: <FiAward className="text-orange-500" /> },
    { label: 'Course Success', value: '98%', icon: <FiTarget className="text-orange-500" /> },
];

export default function AboutSection() {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Image/Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-border bg-card/50 backdrop-blur-sm p-2">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                                alt="Team Working"
                                className="rounded-[2.2rem] w-full object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-500/5 blur-[100px] rounded-full" />
                    </motion.div>

                    {/* Right Side: Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-3">
                                Why Choose Us
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                Bridging the Gap Between <span className="text-orange-500">Learning & Mastery</span>
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Skill Bridge is not just an online learning platform; it's a launchpad for your career.
                                we focus on project-based learning, direct mentorship, and a curriculum that evolves
                                with the industry. Our mission is to make high-quality tech education accessible to everyone.
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Industry Expert Mentors",
                                "Project-Based Learning",
                                "Lifetime Course Access",
                                "Career Placement Support"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                                    <span className="font-medium text-foreground/80">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats Wrapper */}
                        <div className="pt-8 border-t border-border flex flex-wrap gap-8 md:gap-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {stat.icon}
                                        <span className="text-2xl font-bold">{stat.value}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}