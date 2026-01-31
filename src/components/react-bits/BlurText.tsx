"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    threshold?: number;
    rootMargin?: string;
    animationFrom?: any;
    animationTo?: any;
    easing?: any;
    onAnimationComplete?: () => void;
}

export const BlurText = ({
    text = "",
    delay = 200,
    className = "",
    animateBy = "words",
    direction = "top",
    threshold = 0.1,
    rootMargin = "0px",
    animationFrom,
    animationTo,
    easing = "easeOut",
    onAnimationComplete,
    highlightMatches,
    highlightClassName = "",
}: BlurTextProps & { highlightMatches?: RegExp; highlightClassName?: string }) => {
    const elements = animateBy === "words" ? text.split(" ") : text.split("");
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);

    // Default animations based on direction
    const defaultFrom =
        direction === "top"
            ? { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,-50px,0)" }
            : { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,50px,0)" };

    const defaultTo = [
        {
            filter: "blur(5px)",
            opacity: 0.5,
            transform: direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
        },
        { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const springs = {
        damping: 20,
        stiffness: 100,
    };

    return (
        <p ref={ref} className={`flex flex-wrap ${className}`}>
            {elements.map((element, index) => {
                const isMatch = highlightMatches ? highlightMatches.test(element) : false;
                return (
                    <motion.span
                        key={index}
                        initial={animationFrom || defaultFrom}
                        animate={inView ? (animationTo || defaultTo) : (animationFrom || defaultFrom)}
                        transition={{
                            delay: (index * delay) / 1000,
                            duration: 0.8,
                            ease: easing,
                        }}
                        className={`mr-2 inline-block will-change-[transform,filter,opacity] ${isMatch ? highlightClassName : ""}`}
                    >
                        {element === " " ? "\u00A0" : element}
                    </motion.span>
                );
            })}
        </p>
    );
};
