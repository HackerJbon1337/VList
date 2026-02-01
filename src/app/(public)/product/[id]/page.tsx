import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProductById } from "@/lib/products";
import {
    ProductImageGallery,
    SellerInfo,
    ContactSellerButton,
} from "@/components/product";
import { ShieldCheck, MessageSquare } from "lucide-react";

// Featured products from homepage (College Essentials)
const FEATURED_PRODUCTS = [
    {
        id: "101",
        title: "Sony WH-1000XM5 Headphones",
        description: "Premium wireless noise-cancelling headphones. Perfect for studying in noisy environments. Includes carrying case and cables.",
        price: 24990,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics",
        location: "CB (Central Block)",
        condition: "Like New" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "103",
        title: "Ergonomic Mesh Chair",
        description: "Comfortable mesh office chair with lumbar support. Great for long study sessions. Adjustable height and armrests.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop",
        category: "Furniture",
        location: "MH1",
        condition: "Good" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "104",
        title: "TI-84 Plus CE Calculator",
        description: "Texas Instruments graphing calculator. Essential for engineering and math courses. Includes charging cable.",
        price: 7500,
        image: "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?q=80&w=1000&auto=format&fit=crop",
        category: "School Supplies",
        location: "AB1",
        condition: "Like New" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "105",
        title: "Mechanical Keyboard 60%",
        description: "Compact mechanical keyboard with Cherry MX Blue switches. RGB backlit. Perfect for dorm desk setup.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics",
        location: "Food Street",
        condition: "New" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "106",
        title: "LED Desk Lamp with Wireless Charging",
        description: "Modern LED desk lamp with built-in wireless charging pad. Multiple brightness levels and color temperatures.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop",
        category: "Furniture",
        location: "LH2",
        condition: "New" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "107",
        title: "Calculus: Early Transcendentals",
        description: "8th Edition by James Stewart. Used for MATH 101/102. Some highlighting, otherwise excellent condition.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
        category: "Textbooks",
        location: "AB2",
        condition: "Good" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
    {
        id: "108",
        title: "Herschel Retreat Backpack",
        description: "Classic Herschel backpack with laptop sleeve. Perfect for daily commute to classes. Barely used.",
        price: 4200,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
        category: "Accessories",
        location: "Rock Plaza",
        condition: "Like New" as const,
        type: "Sell" as const,
        seller: { name: "Featured Seller", rating: 5 },
        createdAt: new Date().toISOString(),
    },
];

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;

    // Try to fetch from Supabase first
    let product = null;

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .eq("is_active", true)
            .single();

        if (data && !error) {
            // Get seller info separately
            let seller: { name: string; rating: number; major?: string; gradYear?: number } = { name: "Unknown", rating: 5 };
            if (data.seller_id) {
                const { data: sellerData } = await supabase
                    .from("profiles")
                    .select("name, rating, major, grad_year")
                    .eq("id", data.seller_id)
                    .single();
                if (sellerData) {
                    seller = {
                        name: sellerData.name || "Unknown",
                        rating: sellerData.rating || 5,
                        major: sellerData.major ?? undefined,
                        gradYear: sellerData.grad_year ?? undefined,
                    };
                }
            }

            product = {
                id: data.id,
                title: data.title,
                description: data.description,
                price: data.price,
                image: data.image_url,
                category: data.category,
                location: data.location,
                condition: data.condition,
                type: data.type,
                seller,
                createdAt: data.created_at,
            };
        }
    } catch {
        // If Supabase fails, fall back to mock data
    }

    // Fallback to mock data if not found in Supabase
    if (!product) {
        product = getProductById(id);
    }

    // Fallback to featured products (College Essentials from homepage)
    if (!product) {
        product = FEATURED_PRODUCTS.find(p => p.id === id);
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="pb-20 md:pb-8"> {/* Padding for sticky mobile bar */}
            {/* Breadcrumb - Desktop Only */}
            <div className="container mx-auto max-w-7xl px-4 py-4 hidden md:block">
                <nav className="text-sm text-muted-foreground flex items-center gap-2">
                    <Link href="/marketplace" className="hover:text-foreground">Marketplace</Link>
                    <span>/</span>
                    <span className="text-foreground">{product.category}</span>
                </nav>
            </div>

            <div className="container mx-auto max-w-7xl px-0 md:px-4">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left: Images */}
                    <div className="bg-muted/10 md:bg-transparent">
                        <ProductImageGallery images={[product.image]} title={product.title} />
                    </div>

                    {/* Right: Info */}
                    <div className="px-4 md:px-0 space-y-6">
                        <div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{product.title}</h1>
                                    <p className="mt-1 text-sm text-muted-foreground">{product.category} • {product.condition}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-foreground">
                                        {product.price > 0 ? `₹${product.price}` : "Free"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-sm text-muted-foreground">
                            <h3 className="text-sm font-medium text-foreground mb-1">Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="border-t border-border pt-6">
                            <SellerInfo seller={product.seller} />
                        </div>

                        {/* Trust Safety Tip */}
                        <div className="rounded-md bg-blue-50/50 p-4 border border-blue-100 flex gap-3 text-sm text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-200">
                            <ShieldCheck className="h-5 w-5 shrink-0" />
                            <p><strong>Safety Tip:</strong> Always meet in a public place like the library or student center. Inspect the item before paying.</p>
                        </div>

                        {/* Desktop Action */}
                        <div className="hidden md:block">
                            <ContactSellerButton product={product} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50 flex items-center gap-4 shadow-lg">
                <div className="flex-1">
                    <p className="font-bold text-lg">{product.price > 0 ? `₹${product.price}` : "Free"}</p>
                    <p className="text-xs text-muted-foreground truncate">{product.title}</p>
                </div>
                <div className="flex-1">
                    <ContactSellerButton product={product} />
                </div>
            </div>
        </div>
    );
}

