"use client";

import { motion } from "framer-motion";

interface ColourBlendsProps {
    className?: string;
    colors?: string[];
}

export function ColourBlends({
    className = "",
    colors = ["#00d4ff", "#ff6b9d", "#c084fc"],
}: ColourBlendsProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {colors.map((color, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[100px] opacity-30"
                    style={{
                        background: color,
                        width: "40%",
                        height: "40%",
                    }}
                    animate={{
                        x: [
                            `${20 + i * 20}%`,
                            `${60 - i * 15}%`,
                            `${30 + i * 10}%`,
                            `${20 + i * 20}%`,
                        ],
                        y: [
                            `${20 + i * 15}%`,
                            `${50 - i * 10}%`,
                            `${70 - i * 20}%`,
                            `${20 + i * 15}%`,
                        ],
                    }}
                    transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
