"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useAuthStore, useCartStore } from "@/store";

interface ContactSellerButtonProps {
    product: Product;
}

export function ContactSellerButton({ product }: ContactSellerButtonProps) {
    const { user } = useAuthStore();
    const { addItem } = useCartStore();

    const handleContact = () => {
        if (!user) {
            window.location.href = `/login?redirect=/product/${product.id}`;
            return;
        }
        window.location.href = `/messages?seller=${product.seller.name}`;
    };

    const handleAddToCart = () => {
        if (!user) {
            window.location.href = `/login?redirect=/product/${product.id}`;
            return;
        }
        addItem(product);
        alert("Added to cart!");
    };

    // Different button text based on product type
    const getButtonText = () => {
        switch (product.type) {
            case "Donate":
                return "Request Item";
            case "Trade":
                return "Propose Trade";
            default:
                return "Contact Seller";
        }
    };

    return (
        <div className="space-y-3">
            {/* Add to Cart (for Sell items) */}
            {product.type === "Sell" && product.price > 0 && (
                <button
                    onClick={handleAddToCart}
                    className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    Add to Cart
                </button>
            )}

            {/* Contact Seller */}
            <button
                onClick={handleContact}
                className={`inline-flex h-12 w-full items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${product.type === "Sell" && product.price > 0
                        ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
            >
                {getButtonText()}
            </button>

            {!user && (
                <p className="text-center text-xs text-muted-foreground">
                    You&apos;ll need to{" "}
                    <Link
                        href={`/login?redirect=/product/${product.id}`}
                        className="text-primary hover:underline"
                    >
                        sign in
                    </Link>{" "}
                    to continue
                </p>
            )}
        </div>
    );
}
