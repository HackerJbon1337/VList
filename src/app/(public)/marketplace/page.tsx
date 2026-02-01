"use client";

import { useState, useCallback, useEffect } from "react";
import {
    SearchBar,
    CategoryFilter,
    LocationFilter,
    ProductGrid,
    Pagination,
} from "@/components/marketplace";
import { MockDataDisclaimer } from "@/components/marketplace/MockDataDisclaimer";
import { fetchProducts, getProducts, categories, locations, type Product } from "@/lib/products";

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [location, setLocation] = useState("All Campuses");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMockData, setIsMockData] = useState(false);

    // Fetch products whenever filters change
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const result = await fetchProducts({
                search,
                category,
                location,
                page,
                limit: 8,
            });

            // Check if we got real products or need to show mock data
            if (result.isMockData || result.products.length === 0) {
                // No real products yet, show mock data
                const mockResult = getProducts({ search, category, location, page, limit: 8 });
                setProducts(mockResult.products);
                setTotal(mockResult.total);
                setPages(mockResult.pages);
                setIsMockData(true);
            } else {
                // Real products exist, show only those
                setProducts(result.products);
                setTotal(result.total);
                setPages(result.pages);
                setIsMockData(false);
            }
            setIsLoading(false);
        };

        loadProducts();
    }, [search, category, location, page]);

    const handleSearch = useCallback((query: string) => {
        setSearch(query);
        setPage(1);
    }, []);

    const handleCategoryChange = useCallback((cat: string) => {
        setCategory(cat);
        setPage(1);
    }, []);

    const handleLocationChange = useCallback((loc: string) => {
        setLocation(loc);
        setPage(1);
    }, []);

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            {/* Mock Data Disclaimer Popup */}
            <MockDataDisclaimer isMockData={isMockData} />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <p className="mt-2 text-muted-foreground">
                    {isMockData ? (
                        <>Showing demo products • <span className="text-amber-500">Real listings coming soon!</span></>
                    ) : (
                        <>Discover {total.toLocaleString()} amazing products from trusted sellers</>
                    )}
                </p>
            </div>

            {/* Search & Filters */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <SearchBar onSearch={handleSearch} defaultValue={search} />
                    <LocationFilter
                        locations={locations}
                        selected={location}
                        onSelect={handleLocationChange}
                    />
                </div>

                {/* Category Filter */}
                <CategoryFilter
                    categories={categories}
                    selected={category}
                    onSelect={handleCategoryChange}
                />
            </div>

            {/* Active Filters Summary */}
            {(search || category !== "All" || location !== "All Campuses") && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {search && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            Search: &quot;{search}&quot;
                            <button
                                onClick={() => handleSearch("")}
                                className="ml-1 hover:text-primary"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {category !== "All" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            {category}
                            <button
                                onClick={() => handleCategoryChange("All")}
                                className="ml-1 hover:text-primary"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {location !== "All Campuses" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            {location}
                            <button
                                onClick={() => handleLocationChange("All Campuses")}
                                className="ml-1 hover:text-primary"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    <button
                        onClick={() => {
                            setSearch("");
                            setCategory("All");
                            setLocation("All Campuses");
                            setPage(1);
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Product Grid */}
            {isLoading ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                        <p className="mt-4 text-muted-foreground">Loading products...</p>
                    </div>
                </div>
            ) : (
                <ProductGrid products={products} />
            )}

            {/* Pagination */}
            <div className="mt-12">
                <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
            </div>
        </div>
    );
}

