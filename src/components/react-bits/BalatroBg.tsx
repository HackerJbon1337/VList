"use client";

import { useRef, useEffect } from "react";

interface BalatroBgProps {
    className?: string;
}

export function BalatroBg({ className = "" }: BalatroBgProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            time += 0.005;
            const { width, height } = canvas;

            // Clear with fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);

            // Draw flowing lines
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.strokeStyle = `hsla(${180 + i * 10 + time * 50}, 80%, 60%, 0.1)`;
                ctx.lineWidth = 2;

                for (let x = 0; x < width; x += 5) {
                    const y =
                        height / 2 +
                        Math.sin(x * 0.01 + time + i * 0.5) * 100 +
                        Math.sin(x * 0.02 + time * 1.5) * 50;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

            animationId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 ${className}`}
        />
    );
}
