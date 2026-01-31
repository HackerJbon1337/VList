"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ClickSparkProps {
    children: React.ReactNode;
    color?: string;
    count?: number;
}

interface Spark {
    id: number;
    x: number;
    y: number;
    angle: number;
}

export function ClickSpark({ children, color = "#00d4ff", count = 12 }: ClickSparkProps) {
    const [sparks, setSparks] = useState<Spark[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSparks = Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            angle: (360 / count) * i,
        }));

        setSparks((prev) => [...prev, ...newSparks]);

        setTimeout(() => {
            setSparks((prev) => prev.filter((s) => !newSparks.find((ns) => ns.id === s.id)));
        }, 600);
    };

    return (
        <div ref={containerRef} onClick={handleClick} className="relative cursor-pointer inline-block">
            {children}
            {sparks.map((spark) => {
                const rad = (spark.angle * Math.PI) / 180;
                const distance = 50;
                const tx = Math.cos(rad) * distance;
                const ty = Math.sin(rad) * distance;

                return (
                    <motion.div
                        key={spark.id}
                        className="pointer-events-none absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            left: spark.x,
                            top: spark.y,
                            backgroundColor: color,
                            boxShadow: `0 0 6px ${color}`,
                        }}
                        initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                        animate={{ scale: 0, opacity: 0, x: tx, y: ty }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                );
            })}
        </div>
    );
}
