"use client";

interface DotGridProps {
    className?: string;
    dotColor?: string;
    dotSize?: number;
    spacing?: number;
}

export function DotGrid({
    className = "",
    dotColor = "rgba(0, 0, 0, 0.1)",
    dotSize = 1,
    spacing = 24,
}: DotGridProps) {
    return (
        <div
            className={`pointer-events-none absolute inset-0 ${className}`}
            style={{
                backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
                backgroundSize: `${spacing}px ${spacing}px`,
            }}
        />
    );
}
