"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface CarouselProps {
    items: React.ReactNode[];
    className?: string;
    autoPlay?: boolean;
    interval?: number;
}

export function Carousel({
    items,
    className = "",
    autoPlay = true,
    interval = 4000,
}: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoPlay) {
            timeoutRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % items.length);
            }, interval);
        }
        return () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
        };
    }, [autoPlay, interval, items.length]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="flex"
                animate={{ x: `-${current * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {items.map((item, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                        {item}
                    </div>
                ))}
            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === current
                                ? "bg-primary w-6"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
