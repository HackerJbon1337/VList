"use client";

import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { Search, Sparkles, Zap, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import {
    BlurText,
    GradientText,
    CountUp,
    SpotlightCard,
    DotGrid,
    ClickSpark,
    ColourBlends,
    Dither,
    GradualBlur,
    AnimatedContent,
    FallingText,
    BounceCard,
} from "@/components/react-bits";
import { CollegeEssentials } from "@/components/marketplace/CollegeEssentials";

const orbitron = Orbitron({ subsets: ["latin"] });

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0B0F14] relative overflow-hidden">
            {/* Background Effects */}
            <ColourBlends colors={["#22D3EE", "#60A5FA", "#A78BFA"]} className="-z-10" />
            <Dither opacity={0.04} className="-z-5" />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center py-20">
                <DotGrid dotColor="rgba(34, 211, 238, 0.1)" spacing={40} className="opacity-50" />

                <div className="container mx-auto max-w-6xl px-4 text-center z-10">
                    {/* Badge */}
                    <GradualBlur delay={0.1}>
                        <div className="mb-8 flex justify-center">
                            <GradientText
                                colors={["#22D3EE", "#A78BFA", "#22D3EE"]}
                                animationSpeed={4}
                                showBorder
                            >
                                <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                                    <Sparkles className="w-4 h-4" />
                                    University Marketplace
                                </span>
                            </GradientText>
                        </div>
                    </GradualBlur>

                    {/* Main Headline */}
                    <AnimatedContent animation="fadeUp" delay={0.2}>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
                            <span className="text-[#E5E7EB]">The Future of</span>
                            <br />
                            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                                Student Trading
                            </span>
                        </h1>
                    </AnimatedContent>

                    {/* Subheadline with BlurText */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <BlurText
                            text="Buy, sell, and trade textbooks, electronics, and essentials with verified students on your campus."
                            className="text-xl md:text-2xl text-[#9CA3AF] leading-relaxed justify-center"
                            delay={40}
                            animateBy="words"
                            highlightMatches={/(textbooks|electronics|essentials|verified|students)/i}
                            highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#A78BFA] font-bold"
                        />
                    </div>

                    {/* Search Bar */}
                    <AnimatedContent animation="fadeUp" delay={0.6}>
                        <div className="max-w-2xl mx-auto mb-16">
                            <div className="flex items-center gap-3 p-2 bg-[#111827]/80 backdrop-blur-xl rounded-2xl border border-[#1F2937] hover:border-[#22D3EE]/30 transition-colors">
                                <div className="flex-1 flex items-center gap-3 px-4">
                                    <Search className="w-5 h-5 text-[#6B7280]" />
                                    <input
                                        type="text"
                                        placeholder="Search for textbooks, laptops, furniture..."
                                        className="w-full bg-transparent text-[#E5E7EB] placeholder:text-[#6B7280] outline-none py-3"
                                    />
                                </div>
                                <ClickSpark color="#22D3EE" count={16}>
                                    <Link
                                        href="/marketplace"
                                        className="px-8 py-3 bg-[#22D3EE] hover:bg-[#06B6D4] text-[#0B0F14] font-bold rounded-xl transition-all shadow-lg shadow-[#22D3EE]/25"
                                    >
                                        Search
                                    </Link>
                                </ClickSpark>
                            </div>
                        </div>
                    </AnimatedContent>

                    {/* Stats */}
                    <AnimatedContent animation="fadeUp" delay={0.8}>
                        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-[#E5E7EB]">
                                    <CountUp to={5000} separator="," />+
                                </p>
                                <p className="text-[#6B7280] text-sm mt-2 uppercase tracking-wider">Active Students</p>
                            </div>
                            <div className="w-px h-16 bg-[#1F2937] hidden md:block" />
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-[#E5E7EB]">
                                    <CountUp to={2500} separator="," />+
                                </p>
                                <p className="text-[#6B7280] text-sm mt-2 uppercase tracking-wider">Items Listed</p>
                            </div>
                            <div className="w-px h-16 bg-[#1F2937] hidden md:block" />
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-[#E5E7EB]">
                                    <CountUp to={95} />%
                                </p>
                                <p className="text-[#6B7280] text-sm mt-2 uppercase tracking-wider">Satisfaction</p>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-[#1F2937] flex justify-center pt-2">
                        <div className="w-1 h-2 bg-[#6B7280] rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="text-center mb-20">
                        <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 text-4xl md:text-5xl font-bold text-[#E5E7EB]">
                            <BlurText
                                text="Why Students Love"
                                className="!text-4xl !md:text-5xl !font-bold !text-[#E5E7EB]"
                                delay={50}
                            />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                                viewport={{ once: true }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] inline-block font-bold"
                            >
                                VList
                            </motion.span>
                        </div>
                        <AnimatedContent animation="fadeUp" delay={0.3}>
                            <p className="text-xl text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
                                Built by students, for students. Experience seamless campus trading.
                            </p>
                        </AnimatedContent>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "Campus Verified",
                                description: "Only verified .edu emails. Trade with real students you can trust.",
                                color: "#22D3EE",
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Instant Meetups",
                                description: "No shipping. Meet between classes and trade in person.",
                                color: "#A78BFA",
                            },
                            {
                                icon: <MessageCircle className="w-8 h-8" />,
                                title: "Secure Chat",
                                description: "Built-in messaging keeps your personal info private.",
                                color: "#22C55E",
                            },
                        ].map((feature, i) => (
                            <BounceCard key={i} delay={0.2 + i * 0.15} className="h-full">
                                <SpotlightCard
                                    spotlightColor={`${feature.color}40`}
                                    className="h-full p-8 bg-[#111827] border-[#1F2937]"
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3">{feature.title}</h3>
                                    <p className="text-[#9CA3AF] leading-relaxed">{feature.description}</p>
                                </SpotlightCard>
                            </BounceCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* College Essentials Showcase */}
            <CollegeEssentials />

            {/* Categories */}
            <section className="py-32 relative bg-[#151F2E]/50">
                <DotGrid dotColor="rgba(255, 255, 255, 0.03)" spacing={30} />
                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <AnimatedContent animation="fadeRight">
                                <h2 className="text-4xl font-bold text-[#E5E7EB]">Browse Categories</h2>
                            </AnimatedContent>
                            <AnimatedContent animation="fadeRight" delay={0.1}>
                                <p className="text-[#9CA3AF] mt-2">Find exactly what you need</p>
                            </AnimatedContent>
                        </div>
                        <Link
                            href="/marketplace"
                            className="text-[#22D3EE] hover:text-[#06B6D4] font-medium transition-colors"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            {
                                name: "Textbooks",
                                image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
                            },
                            {
                                name: "Electronics",
                                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop",
                            },
                            {
                                name: "Clothing",
                                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
                            },
                            {
                                name: "Furniture",
                                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
                            },
                            {
                                name: "Sports",
                                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
                            },
                            {
                                name: "Misc",
                                image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop",
                            },
                        ].map((cat, i) => (
                            <BounceCard key={cat.name} delay={0.1 + i * 0.05} className="h-full">
                                <SpotlightCard
                                    className="h-full overflow-hidden border-[#1F2937] bg-[#111827] hover:border-[#22D3EE]/30 transition-colors"
                                    spotlightColor="rgba(34, 211, 238, 0.4)"
                                >
                                    <Link
                                        href={`/marketplace?category=${cat.name}`}
                                        className="group relative flex flex-col items-center justify-center aspect-square w-full h-full"
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                fill
                                                className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500 ease-out"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col items-center">
                                            <span className="font-bold text-[#E5E7EB] text-xl tracking-tight drop-shadow-lg group-hover:translate-y-[-4px] transition-transform duration-300">
                                                {cat.name}
                                            </span>
                                            <div className="h-0.5 w-0 bg-[#22D3EE] mt-2 group-hover:w-full transition-all duration-300" />
                                        </div>
                                    </Link>
                                </SpotlightCard>
                            </BounceCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 relative overflow-hidden">
                <ColourBlends colors={["#22D3EE", "#A78BFA"]} className="opacity-20" />
                <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
                    <AnimatedContent animation="fadeUp">
                        <div className="flex justify-center mb-8">
                            <BlurText
                                text="Ready to Start Trading?"
                                className="!text-5xl !md:text-6xl !font-bold !text-[#E5E7EB] text-center"
                                delay={40}
                            />
                        </div>
                        <p className="text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto">
                            Join thousands of students already saving money and decluttering their dorms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <ClickSpark color="#22D3EE" count={20}>
                                <Link
                                    href="/marketplace"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#22D3EE] hover:bg-[#06B6D4] text-[#0B0F14] font-bold text-lg transition-all shadow-xl shadow-[#22D3EE]/30"
                                >
                                    Browse Marketplace
                                </Link>
                            </ClickSpark>
                            <ClickSpark color="#A78BFA" count={20}>
                                <Link
                                    href="/sell"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#111827] border border-[#1F2937] text-[#E5E7EB] font-bold text-lg hover:bg-[#1F2937] transition-all"
                                >
                                    Post an Item
                                </Link>
                            </ClickSpark>
                        </div>
                    </AnimatedContent>
                </div>
            </section >
        </div >
    );
}
