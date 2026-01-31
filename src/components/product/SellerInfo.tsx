import { Product } from "@/lib/products";

interface SellerInfoProps {
    seller: Product["seller"];
}

export function SellerInfo({ seller }: SellerInfoProps) {
    return (
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="mb-6 text-lg font-bold tracking-tight">About the Seller</h3>

            <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary ring-4 ring-background">
                    {seller.name.charAt(0)}
                </div>

                {/* Info */}
                <div>
                    <p className="font-bold text-lg leading-none">{seller.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        {seller.major && <span className="font-medium text-foreground/80">{seller.major}</span>}
                        {seller.major && seller.gradYear && <span className="text-muted-foreground/40">•</span>}
                        {seller.gradYear && <span>Class of '{seller.gradYear.toString().slice(-2)}</span>}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm">
                        <div className="flex text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="stroke-none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        </div>
                        <span className="font-bold text-foreground">{seller.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">(24 reviews)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
