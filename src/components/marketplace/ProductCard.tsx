"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Link
                href={`/product/${product.id}`}
                className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-[#00d4ff]/50 hover:bg-white/[0.05] transition-all"
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badge */}
                    {(product.condition === "New" || product.type === "Donate") && (
                        <div className="absolute top-3 left-3">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-lg ${product.type === "Donate"
                                ? "bg-[#c084fc] text-white shadow-[#c084fc]/30"
                                : "bg-[#00d4ff] text-black shadow-[#00d4ff]/30"
                                }`}>
                                {product.type === "Donate" ? "Free" : "New"}
                            </span>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                            {product.title}
                        </h3>
                        <span className="shrink-0 text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] bg-clip-text text-transparent">
                            {product.price > 0 ? `₹${product.price}` : "Free"}
                        </span>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between text-xs text-white/40">
                        <span className="truncate max-w-[60%]">{product.location}</span>
                        <span className="px-2 py-1 rounded-full bg-white/5">{product.category}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
