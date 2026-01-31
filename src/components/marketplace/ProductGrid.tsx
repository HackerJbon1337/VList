import { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white/30"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-white/50 max-w-sm">
                    Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                    onClick={() => window.location.href = '/marketplace'}
                    className="mt-6 text-sm font-medium text-[#00d4ff] hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
    );
}
