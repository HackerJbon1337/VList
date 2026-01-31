export function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[4/3] bg-muted" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="h-5 w-3/4 rounded bg-muted" />
                    <div className="h-5 w-16 rounded bg-muted" />
                </div>

                <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-2/3 rounded bg-muted" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-3 w-16 rounded bg-muted" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 animate-pulse">
            {/* Breadcrumb */}
            <div className="mb-6 h-4 w-64 rounded bg-muted" />

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[4/3] rounded-lg bg-muted" />

                {/* Details */}
                <div className="space-y-6">
                    <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-full bg-muted" />
                        <div className="h-6 w-20 rounded-full bg-muted" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-8 w-3/4 rounded bg-muted" />
                        <div className="h-10 w-24 rounded bg-muted" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-2/3 rounded bg-muted" />
                    </div>

                    <div className="h-12 w-full rounded-md bg-muted" />

                    <div className="rounded-lg border border-border/40 p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-muted" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-muted" />
                                <div className="h-3 w-24 rounded bg-muted" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MessagesSkeleton() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 animate-pulse">
            <div className="mb-8 h-8 w-32 rounded bg-muted" />

            <div className="grid h-[600px] gap-4 lg:grid-cols-3">
                {/* Conversation list */}
                <div className="rounded-lg border border-border/40 bg-card">
                    <div className="border-b border-border/40 p-4">
                        <div className="h-5 w-28 rounded bg-muted" />
                    </div>
                    <div className="p-4 space-y-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-24 rounded bg-muted" />
                                    <div className="h-3 w-full rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat area */}
                <div className="lg:col-span-2 rounded-lg border border-border/40 bg-card flex items-center justify-center">
                    <div className="h-4 w-48 rounded bg-muted" />
                </div>
            </div>
        </div>
    );
}
