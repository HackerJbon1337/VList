"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpotlightCard, AnimatedContent, BounceCard } from "@/components/react-bits";

const ESSENTIALS = [
    {
        id: 101,
        title: "Sony WH-1000XM5 Headphones",
        price: 24990,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics",
        tag: "Must Have"
    },
    {
        id: 103,
        title: "Ergonomic Mesh Chair",
        price: 8500,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop",
        category: "Furniture",
        tag: "Study Setup"
    },
    {
        id: 104,
        title: "TI-84 Plus CE Calculator",
        price: 7500,
        image: "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?q=80&w=1000&auto=format&fit=crop",
        category: "School Supplies",
        tag: "Exam Ready"
    },
    {
        id: 105,
        title: "Mechanical Keyboard 60%",
        price: 4500,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics",
        tag: "Productivity"
    },
    {
        id: 106,
        title: "LED Desk Lamp with Wireless Charging",
        price: 1800,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop",
        category: "Furniture",
        tag: "Essentials"
    },
    {
        id: 107,
        title: "Calculus: Early Transcendentals",
        price: 2200,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
        category: "Textbooks",
        tag: "Best Seller"
    },
    {
        id: 108,
        title: "Herschel Retreat Backpack",
        price: 4200,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
        category: "Accessories",
        tag: "Daily Carry"
    }
];

export function CollegeEssentials() {
    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <AnimatedContent animation="fadeUp">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">College Essentials</h2>
                            <p className="text-white/50">Curated picks for your best semester yet.</p>
                        </div>
                        <Link href="/marketplace?tag=essentials" className="text-[#00d4ff] hover:underline font-medium">
                            Shop Collection &rarr;
                        </Link>
                    </div>
                </AnimatedContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {ESSENTIALS.map((item, i) => (
                        <BounceCard key={item.id} delay={i * 0.1} className="h-full">
                            <Link href={`/product/${item.id}`} className="block h-full">
                                <SpotlightCard className="h-full bg-white/[0.03] border-white/10 overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-square w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                            {item.tag}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-[#00d4ff] font-medium mb-1 uppercase tracking-wide">{item.category}</div>
                                        <h3 className="font-semibold text-white mb-2 line-clamp-1">{item.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/90 font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#00d4ff] group-hover:text-black transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </BounceCard>
                    ))}
                </div>

                {/* View More in Marketplace Button */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105"
                    >
                        <span>View More in Marketplace</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
