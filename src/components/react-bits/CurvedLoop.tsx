"use client";

import { motion } from "framer-motion";

interface CurvedLoopProps {
    className?: string;
    color?: string;
}

export function CurvedLoop({ className = "", color = "#00d4ff" }: CurvedLoopProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <svg
                className="w-full h-full opacity-20"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="50%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0, 1, 2].map((i) => (
                    <motion.path
                        key={i}
                        d="M 0,500 Q 250,300 500,500 T 1000,500"
                        fill="none"
                        stroke="url(#loopGradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "easeInOut",
                        }}
                        style={{
                            transform: `translateY(${i * 50 - 50}px)`,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
