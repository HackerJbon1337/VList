"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradualBlurProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function GradualBlur({ children, className = "", delay = 0 }: GradualBlurProps) {
    return (
        <motion.div
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{
                duration: 0.8,
                delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
