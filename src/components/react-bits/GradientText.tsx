"use client";

import { motion } from "framer-motion";

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export function GradientText({
    children,
    className = "",
    colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"], // Default to trust/teal colors
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
    };

    return (
        <div className={`relative flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}>
            {showBorder && (
                <div
                    className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
                    style={{
                        ...gradientStyle,
                        animationDuration: `${animationSpeed}s`,
                    }}
                >
                    <div className="absolute inset-[2px] bg-background rounded-[1.25rem] z-10" />
                </div>
            )}

            <div
                className="z-20 bg-clip-text text-transparent animate-gradient"
                style={{
                    ...gradientStyle,
                    animationDuration: `${animationSpeed}s`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
