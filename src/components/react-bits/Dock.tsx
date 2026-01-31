"use client";

import { useRef, useState } from "react";
import { useSpring, motion, MotionValue, useMotionValue, useTransform } from "framer-motion";

interface DockProps {
    items: { icon: React.ReactNode; label: string; onClick?: () => void }[];
    className?: string;
}

export function Dock({ items, className = "" }: DockProps) {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`mx-auto flex h-16 items-end gap-3 rounded-2xl backdrop-blur-xl px-4 pb-3 border ${className}`}
        >
            {items.map((item, i) => (
                <AppIcon mouseX={mouseX} key={i} item={item} />
            ))}
        </motion.div>
    );
}

function AppIcon({ mouseX, item }: { mouseX: MotionValue; item: any }) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [44, 70, 44]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square cursor-pointer rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-colors"
            onClick={item.onClick}
            whileTap={{ scale: 0.9 }}
        >
            <div className="h-5 w-5 text-white/80">{item.icon}</div>
        </motion.div>
    );
}
