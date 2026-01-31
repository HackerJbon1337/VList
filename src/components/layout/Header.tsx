"use client";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

import Link from "next/link";
import Image from "next/image";
import { useAuthStore, useCartStore } from "@/store";
import { usePathname } from "next/navigation";
import { ShoppingCart, Plus, Home, Search as SearchIcon, MessageSquare, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Dock } from "@/components/react-bits/Dock";

export function Header() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const { getItemCount } = useCartStore();
    const cartCount = getItemCount();

    const isActive = (path: string) => pathname === path;

    // Mobile Dock Items
    const dockItems = [
        { icon: <Home className="h-5 w-5" />, label: "Home", onClick: () => window.location.href = "/" },
        { icon: <SearchIcon className="h-5 w-5" />, label: "Market", onClick: () => window.location.href = "/marketplace" },
        { icon: <Plus className="h-5 w-5" />, label: "Sell", onClick: () => window.location.href = "/sell" },
        { icon: <MessageSquare className="h-5 w-5" />, label: "Chat", onClick: () => window.location.href = "/messages" },
        { icon: <User className="h-5 w-5" />, label: "Profile", onClick: () => { } },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 border-b border-[#1F2937] bg-[#0B0F14]/90 backdrop-blur-xl"
            >
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-12 w-12"
                        >
                            <Image
                                src="/logo-new.png"
                                alt="VList Logo"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </motion.div>
                        <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF] group-hover:from-[#22D3EE] group-hover:to-[#06B6D4] transition-all duration-300">
                            VList
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {(user ? [
                            { href: "/marketplace", label: "Marketplace" },
                            { href: "/sell", label: "Sell" },
                            { href: "/messages", label: "Messages" },
                        ] : [
                            { href: "/marketplace", label: "Explore" },
                            { href: "/sell", label: "Sell" },
                        ]).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm font-medium transition-colors ${isActive(item.href) ? "text-[#22D3EE]" : "text-[#9CA3AF] hover:text-[#E5E7EB]"
                                    }`}
                            >
                                {item.label}
                                {isActive(item.href) && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22D3EE] rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Cart - Only visible for logged in users */}
                        {user && (
                            <Link
                                href="/checkout"
                                className="relative p-2.5 text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#111827] rounded-xl transition-all"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </Link>
                        )}

                        {user ? (
                            <>
                                <div className="w-px h-6 bg-[#1F2937] mx-2 hidden sm:block"></div>

                                <div className="flex items-center gap-3">
                                    <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <div className="h-9 w-9 rounded-full bg-[#151F2E] flex items-center justify-center text-sm font-bold text-[#22D3EE] ring-2 ring-[#22D3EE]/20">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-[#E5E7EB] hidden lg:block">Profile</span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="text-sm font-medium text-[#9CA3AF] hover:text-[#E5E7EB] hidden sm:block transition-colors ml-2"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-px h-6 bg-[#1F2937] mx-2 hidden sm:block"></div>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-[#9CA3AF] hover:text-[#E5E7EB] px-4 py-2 transition-colors"
                                >
                                    Log in
                                </Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/register"
                                        className="text-sm font-bold text-[#0B0F14] bg-[#E5E7EB] px-4 py-2 rounded-lg hover:bg-white transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Mobile Dock (Fixed Bottom) */}
            <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none md:hidden flex justify-center px-4">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="pointer-events-auto"
                >
                    <Dock items={dockItems} className="bg-[#0B0F14]/90 border-[#1F2937]" />
                </motion.div>
            </div>
        </>
    );
}
