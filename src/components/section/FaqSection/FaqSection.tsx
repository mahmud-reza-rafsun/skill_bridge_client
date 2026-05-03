'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const faqs = [
    {
        question: "How long will I have access to the course content?",
        answer: "You will have lifetime access to the course materials. This includes all future updates and resources we add to this specific curriculum."
    },
    {
        question: "Do you provide any job placement support?",
        answer: "Yes! Our dedicated career team helps with resume building, portfolio reviews, and connects top-performing students with our partner companies."
    },
    {
        question: "Is there any prerequisite for starting the course?",
        answer: "Most of our foundation courses are beginner-friendly. However, a basic understanding of computer operations and a passion for learning is all you need."
    },
    {
        question: "Will I get a certificate after completion?",
        answer: "Absolutely! Once you complete all the modules and the final project, you will receive a verified digital certificate that you can share on LinkedIn."
    },
    {
        question: "What if I get stuck during my learning journey?",
        answer: "We have a dedicated support network. You can ask questions in our private community forum or join our weekly live doubt-solving sessions."
    }
];

function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header Part */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
                    >
                        Common <span className="text-orange-500">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg"
                    >
                        Everything you need to know about our platform and process.
                    </motion.p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                                    ? 'bg-card border-orange-500/50 shadow-lg shadow-orange-500/5'
                                    : 'bg-card/40 border-border hover:border-orange-500/30'
                                    }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                                >
                                    <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-foreground/80'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-orange-500' : 'text-muted-foreground'}`}>
                                        <FiPlus size={22} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-6 md:px-6 md:pb-8">
                                                <div className="pt-4 border-t border-border/50">
                                                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FaqSection;