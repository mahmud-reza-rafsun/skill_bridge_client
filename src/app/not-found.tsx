import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">

            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="text-center relative z-10">
                {/* 404 Text with Gradient */}
                <h1 className="text-[10rem] md:text-[15rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-200 dark:to-orange-900/20 selection:bg-orange-500/30">
                    404
                </h1>

                <div className="max-w-md mx-auto -mt-4 md:-mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground py-4 lg:py-8">
                        Oops! Page not found
                    </h2>
                    <p className="text-muted-foreground mt-4 mb-10">
                        The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable. Let's get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-500 group">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </Link>
                        </Button>

                        <Button asChild className="w-full sm:w-auto rounded-full px-8 h-12 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95">
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Subtle Illustration or Icon */}
            <div className="mt-16 text-muted-foreground opacity-20">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            </div>
        </div>
    );
}