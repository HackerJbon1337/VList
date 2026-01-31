"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore, useAuthStore } from "@/store";

export default function CheckoutPage() {
    const { user } = useAuthStore();
    const { items, getTotal, removeItem, updateQuantity, clearCart } = useCartStore();

    const total = getTotal();

    if (items.length === 0) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-4 text-muted-foreground/50"
                >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="mt-2 text-muted-foreground">
                    Discover products you&apos;ll love in the marketplace
                </p>
                <Link
                    href="/marketplace"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Browse Marketplace
                </Link>
            </div>
        );
    }

    const handleCheckout = () => {
        // In production: integrate with payment provider
        alert("Checkout feature coming soon! This is a demo.");
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex gap-4 rounded-lg border border-border/40 bg-card p-4"
                        >
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.product.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.product.seller.name}</p>
                                <p className="mt-1 font-bold text-primary">
                                    ${item.product.price.toLocaleString()}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="text-sm text-muted-foreground hover:text-destructive"
                                >
                                    Remove
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="h-8 w-8 rounded border text-sm hover:bg-muted"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="h-8 w-8 rounded border text-sm hover:bg-muted"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Clear cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="rounded-lg border border-border/40 bg-card p-6 h-fit">
                    <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform Fee</span>
                            <span>$0</span>
                        </div>
                    </div>

                    <div className="my-4 border-t border-border/40" />

                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">${total.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Complete Purchase
                    </button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        Logged in as {user?.email}
                    </p>
                </div>
            </div>
        </div>
    );
}
