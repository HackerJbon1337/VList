"use client";

interface ChromaGridProps {
    className?: string;
    colors?: string[];
    cellSize?: number;
}

export function ChromaGrid({
    className = "",
    colors = ["#00d4ff", "#ff6b9d", "#c084fc", "#4ade80"],
    cellSize = 60,
}: ChromaGridProps) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          linear-gradient(${colors[0]}15 1px, transparent 1px),
          linear-gradient(90deg, ${colors[0]}15 1px, transparent 1px)
        `,
                backgroundSize: `${cellSize}px ${cellSize}px`,
            }}
        >
            {/* Gradient Overlays */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(ellipse at 20% 30%, ${colors[0]}30 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, ${colors[1]}30 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 50%, ${colors[2]}20 0%, transparent 60%)`,
                }}
            />
        </div>
    );
}
