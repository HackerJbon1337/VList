"use client";

import { motion } from "framer-motion";

interface FallingTextProps {
    text: string;
    className?: string;
    staggerDelay?: number;
}

export function FallingText({ text, className = "", staggerDelay = 0.05 }: FallingTextProps) {
    const words = text.split(" ");

    return (
        <div className={`flex flex-wrap gap-x-2 ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                        delay: i * staggerDelay,
                    }}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}
