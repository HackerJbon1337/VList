import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import {
    ProductImageGallery,
    SellerInfo,
    ContactSellerButton,
} from "@/components/product";
import { ShieldCheck, MessageSquare } from "lucide-react";

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = getProductById(id);

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
