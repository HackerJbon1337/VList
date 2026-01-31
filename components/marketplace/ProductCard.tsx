import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="group overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Type Badge */}
                <div className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                    {product.type}
                </div>
                {/* Condition Badge */}
                <div className="absolute top-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                    {product.condition}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                    </h3>
                    <span className="shrink-0 text-lg font-bold text-primary">
                        {product.price > 0 ? `$${product.price.toLocaleString()}` : "Free"}
                    </span>
                </div>

                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        {product.location}
                    </span>
                    <span className="flex items-center gap-1">
                        {product.seller.major && `${product.seller.major} • `}
                        {product.seller.gradYear}
                    </span>
                </div>
            </div>
        </Link>
    );
}
