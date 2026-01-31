"use client";

import { ReactNode } from "react";

interface FluidGlassProps {
    children: ReactNode;
    className?: string;
    blur?: "sm" | "md" | "lg" | "xl";
    opacity?: number;
}

export function FluidGlass({
    children,
    className = "",
    blur = "md",
    opacity = 0.8,
}: FluidGlassProps) {
    const blurMap = {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
    };

    return (
        <div
            className={`${blurMap[blur]} rounded-2xl border border-white/20 ${className}`}
            style={{
                background: `rgba(255, 255, 255, ${opacity})`,
            }}
        >
            {children}
        </div>
    );
}
