export default function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-3xl font-bold">Product Detail</h1>
            <p className="mt-2 text-muted-foreground">
                Product ID: {params.id}. This page will be built in Phase 5.
            </p>
        </div>
    );
}
