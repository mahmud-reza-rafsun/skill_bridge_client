'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

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

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-32 bg-background text-foreground transition-colors duration-500">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Common <span className="text-orange-500">Questions</span></h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Everything you need to know about our learning platform and the enrollment process.
                    </p>
                </div>

                <div className="grid gap-5">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group rounded-2xl transition-all duration-300 border-2
                                    ${isOpen
                                        ? 'bg-card border-orange-500 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)]'
                                        : 'bg-card/50 border-border hover:border-orange-500/30'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                >
                                    <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300
                                        ${isOpen ? 'text-orange-600 dark:text-orange-500' : 'text-foreground/90'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isOpen
                                            ? 'bg-orange-500 text-white rotate-0'
                                            : 'bg-orange-100 dark:bg-slate-800 text-orange-600 rotate-90'}`}>
                                        {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                        >
                                            <div className="px-6 pb-8 md:px-8 md:pb-10">
                                                <div className="h-px w-full bg-border/60 mb-6" />
                                                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                                    {faq.answer}
                                                </p>
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