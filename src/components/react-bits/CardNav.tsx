"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardNavItem {
    href: string;
    icon: ReactNode;
    label: string;
}

interface CardNavProps {
    items: CardNavItem[];
    className?: string;
}

export function CardNav({ items, className = "" }: CardNavProps) {
    return (
        <nav className={`flex gap-3 ${className}`}>
            {items.map((item, i) => (
                <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Link
                        href={item.href}
                        className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all"
                    >
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all">
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.label}
                        </span>
                    </Link>
                </motion.div>
            ))}
        </nav>
    );
}
