"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContentProps {
    children: ReactNode;
    className?: string;
    animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "rotate";
    delay?: number;
    duration?: number;
}

export function AnimatedContent({
    children,
    className = "",
    animation = "fadeUp",
    delay = 0,
    duration = 0.6,
}: AnimatedContentProps) {
    const animations = {
        fadeUp: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
        fadeDown: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
        fadeLeft: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
        fadeRight: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
        scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
        rotate: { initial: { opacity: 0, rotate: -10 }, animate: { opacity: 1, rotate: 0 } },
    };

    return (
        <motion.div
            initial={animations[animation].initial}
            animate={animations[animation].animate}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
