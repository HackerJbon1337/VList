"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BounceCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function BounceCard({ children, className = "", delay = 0 }: BounceCardProps) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
