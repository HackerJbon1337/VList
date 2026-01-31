"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
}

export function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = ",",
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (ref.current) {
            // Set initial value
            ref.current.textContent = String(direction === "down" ? to : from);
        }
    }, [from, to, direction]);

    useEffect(() => {
        if (startWhen && isInView) {
            setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);
        }
    }, [motionValue, isInView, delay, to, from, direction, startWhen]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Number(latest.toFixed(0))
                ).replace(/,/g, separator);
            }
        });

        return () => springValue.destroy();
    }, [springValue, separator]);

    return <span className={className} ref={ref} />;
}
