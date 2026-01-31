"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store";

interface Order {
    id: string;
    productTitle: string;
    productImage: string;
    price: number;
    sellerName: string;
    status: "pending" | "completed" | "cancelled";
    date: string;
}

// Mock orders for demo
const mockOrders: Order[] = [
    {
        id: "ord-001",
        productTitle: "TI-84 Plus CE Calculator",
        productImage: "https://picsum.photos/seed/calc/200/200",
        price: 85,
        sellerName: "David Kim",
        status: "completed",
        date: "2024-01-20",
    },
    {
        id: "ord-002",
        productTitle: "Psychology 101 Textbook",
        productImage: "https://picsum.photos/seed/psych/200/200",
        price: 30,
        sellerName: "Tom Holland",
        status: "pending",
        date: "2024-01-22",
    },
];

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
    const { user } = useAuthStore();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

            {mockOrders.length === 0 ? (
                <div className="text-center py-16">
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
                        <path d="M16 16h6" />
                        <path d="M19 13v6" />
                        <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                        <path d="m9 11 3 3L22 4" />
                    </svg>
                    <h2 className="text-xl font-semibold">No orders yet</h2>
                    <p className="mt-2 text-muted-foreground">
                        Start exploring the marketplace to find what you need
                    </p>
                    <Link
                        href="/marketplace"
                        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Browse Marketplace
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="flex gap-4 rounded-lg border border-border/40 bg-card p-4"
                        >
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image
                                    src={order.productImage}
                                    alt={order.productTitle}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold truncate">{order.productTitle}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Sold by {order.sellerName}
                                        </p>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[order.status]
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="font-bold text-primary">
                                        ${order.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(order.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <p className="mt-8 text-center text-sm text-muted-foreground">
                Logged in as {user?.email}
            </p>
        </div>
    );
}
