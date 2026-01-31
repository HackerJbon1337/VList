"use client";

import { ReactNode } from "react";

interface ElectricBorderProps {
    children: ReactNode;
    className?: string;
    color?: string;
    speed?: number;
}

export function ElectricBorder({
    children,
    className = "",
    color = "#00d4ff",
    speed = 3,
    radius = "rounded-xl"
}: ElectricBorderProps & { radius?: string }) {
    return (
        <div className={`relative group ${className}`}>
            {/* Animated Border */}
            <div
                className={`absolute -inset-[1px] ${radius} opacity-75 blur-sm group-hover:opacity-100 transition-opacity`}
                style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    backgroundSize: "200% 100%",
                    animation: `shimmer ${speed}s linear infinite`,
                }}
            />
            <div
                className={`absolute -inset-[1px] ${radius} opacity-50`}
                style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    backgroundSize: "200% 100%",
                    animation: `shimmer ${speed}s linear infinite`,
                    animationDelay: "-1.5s",
                }}
            />
            {/* Content */}
            <div className={`relative bg-black ${radius} overflow-hidden h-full w-full`}>{children}</div>
        </div>
    );
}
