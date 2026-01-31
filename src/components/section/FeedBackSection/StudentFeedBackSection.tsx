'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Avatar {
    id: number;
    name: string;
    image: string;
    ring: "outer" | "inner";
}

interface Position { cx: number; cy: number; }
interface Connection { from: number | 'center'; to: number | 'center'; color: string; }
interface AvatarPositions { [key: string]: Position; }

function StudentFeedBackSection() {
    const [mounted, setMounted] = useState(false);
    const [containerSize, setContainerSize] = useState({ width: 800, height: 800 });

    useEffect(() => {
        setMounted(true);
    }, []);

    const dimensions = useMemo(() => {
        const baseSize = Math.min(containerSize.width, containerSize.height);
        const scale = baseSize / 800;
        return {
            containerSize: baseSize,
            outerRadius: Math.floor(320 * scale),
            innerRadius: Math.floor(200 * scale),
            centerImageSize: Math.floor(180 * scale),
            outerAvatarSize: Math.floor(90 * scale),
            innerAvatarSize: Math.floor(80 * scale),
            strokeWidth: 1.1,
            centerX: baseSize / 2,
            centerY: baseSize / 2,
        };
    }, [containerSize]);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            const size = Math.min(width - 40, 800);
            setContainerSize({ width: size, height: size });
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const avatars: Avatar[] = useMemo(() => {
        const images = [
            "https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg",
            "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
            "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg",
            "https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg",
            "https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg",
            "https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg",
            "https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg",
            "https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg",
            "https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg",
            "https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg",
            "https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg",
            "https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg",
            "https://i.pinimg.com/736x/b0/7b/cc/b07bcc19e5d06dfb888c3263724b8baa.jpg",
            "https://i.pinimg.com/736x/12/ec/d9/12ecd918607b1ccb9d46772435bb592f.jpg",
            "https://i.pinimg.com/1200x/e2/f5/bc/e2f5bc45bd9d07946c9453cfb48747ea.jpg",
            "https://i.pinimg.com/1200x/50/47/d2/5047d259f0d8b3d652b7d3dfa3479139.jpg"
        ];

        return Array.from({ length: 24 }).map((_, i) => {
            let imgUrl = images[i % images.length];

            if (i === 0) imgUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Scooter";
            if (i === 16) imgUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

            return {
                id: i,
                name: `Student ${i + 1}`,
                image: imgUrl,
                ring: i < 14 ? "outer" : "inner"
            };
        });
    }, []);

    const outerRingAvatars = avatars.filter(a => a.ring === 'outer');
    const innerRingAvatars = avatars.filter(a => a.ring === 'inner');

    const [activeConnections, setActiveConnections] = useState<Connection[]>([]);

    const allAvatarPositions: AvatarPositions = useMemo(() => {
        const getPos = (index: number, total: number, radius: number, offset: number): Position => {
            const angle = offset + (index / total) * 2 * Math.PI;
            return {
                cx: dimensions.centerX + radius * Math.cos(angle),
                cy: dimensions.centerY + radius * Math.sin(angle)
            };
        };
        const positions: AvatarPositions = {};
        outerRingAvatars.forEach((av, i) => positions[av.id] = getPos(i, outerRingAvatars.length, dimensions.outerRadius, Math.PI / 2));
        innerRingAvatars.forEach((av, i) => positions[av.id] = getPos(i, innerRingAvatars.length, dimensions.innerRadius, Math.PI / 3));
        positions['center'] = { cx: dimensions.centerX, cy: dimensions.centerY };
        return positions;
    }, [dimensions, outerRingAvatars, innerRingAvatars]);

    useEffect(() => {
        const interval = setInterval(() => {
            const points = [...avatars.map(a => a.id), 'center'];
            let from = points[Math.floor(Math.random() * points.length)];
            let to = points[Math.floor(Math.random() * points.length)];
            if (from !== to) setActiveConnections([{ from, to, color: '#f97316' } as Connection]);
        }, 3000);
        return () => clearInterval(interval);
    }, [avatars]);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen font-sans w-full overflow-hidden bg-background text-foreground transition-colors duration-500">

            <div className="text-center mb-10 max-w-2xl px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Student <span className="text-orange-500">Success Network</span></h2>
                <p className="text-base md:text-lg text-muted-foreground">
                    Real-time feedback drives our shared success.
                </p>
            </div>

            <div className="relative" style={{ width: dimensions.containerSize, height: dimensions.containerSize }}>

                <div className="absolute border border-dashed rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none border-orange-500/10 dark:border-orange-500/20"
                    style={{ width: dimensions.outerRadius * 2, height: dimensions.outerRadius * 2 }} />

                <div className="absolute border border-dashed rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none border-orange-500/10 dark:border-orange-500/20"
                    style={{ width: dimensions.innerRadius * 2, height: dimensions.innerRadius * 2 }} />

                <div className="absolute z-10" style={{ left: dimensions.centerX, top: dimensions.centerY, transform: `translate(-50%, -50%)` }}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full" />
                        <img
                            src="https://i.pinimg.com/736x/5c/62/7a/5c627a3458297ee0c587328e5f7061fc.jpg"
                            alt="Hub"
                            className="rounded-full object-cover border-[3px] border-orange-500 shadow-2xl relative z-10"
                            style={{ width: dimensions.centerImageSize, height: dimensions.centerImageSize }}
                        />
                    </div>
                </div>

                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <AnimatePresence>
                        {activeConnections.map((conn, idx) => {
                            const fromPos = allAvatarPositions[conn.from as number];
                            const toPos = allAvatarPositions[conn.to as number];
                            if (!fromPos || !toPos) return null;
                            const lineLength = Math.sqrt(Math.pow(toPos.cx - fromPos.cx, 2) + Math.pow(toPos.cy - fromPos.cy, 2));

                            return (
                                <motion.line
                                    key={idx}
                                    x1={fromPos.cx} y1={fromPos.cy}
                                    x2={toPos.cx} y2={toPos.cy}
                                    stroke={conn.color}
                                    strokeWidth={dimensions.strokeWidth}
                                    initial={{ strokeDasharray: lineLength, strokeDashoffset: lineLength, opacity: 0 }}
                                    animate={{ strokeDashoffset: 0, opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                />
                            );
                        })}
                    </AnimatePresence>
                </svg>

                {avatars.map((avatar) => {
                    const { cx, cy } = allAvatarPositions[avatar.id];
                    const isActive = activeConnections.some(conn => conn.from === avatar.id || conn.to === avatar.id);
                    const size = avatar.ring === 'outer' ? dimensions.outerAvatarSize : dimensions.innerAvatarSize;

                    return (
                        <div key={avatar.id} className="absolute" style={{ left: cx, top: cy, transform: `translate(-50%, -50%)`, zIndex: isActive ? 30 : 20 }}>
                            <div className={`relative transition-all duration-500 group ${isActive ? 'scale-110' : 'hover:scale-110'}`} style={{ width: size, height: size }}>
                                <div className={`w-full h-full rounded-full overflow-hidden border-2 shadow-sm transition-all duration-500 bg-card 
                                    ${isActive ? 'border-orange-500' : 'border-border dark:border-slate-800'}`}>
                                    <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground shadow-md whitespace-nowrap z-50 border border-border">
                                    {avatar.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StudentFeedBackSection;