"use client";

import { useState, useCallback } from "react";
import {
    SearchBar,
    CategoryFilter,
    LocationFilter,
    ProductGrid,
    Pagination,
} from "@/components/marketplace";
import { getProducts, categories, locations } from "@/lib/products";

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [location, setLocation] = useState("All Campuses");
    const [page, setPage] = useState(1);

    const { products, total, pages } = getProducts({
        search,
        category,
        location,
        page,
        limit: 8,
    });

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
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <p className="mt-2 text-muted-foreground">
                    Discover {total.toLocaleString()} amazing products from trusted sellers
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
            <ProductGrid products={products} />

            {/* Pagination */}
            <div className="mt-12">
                <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
            </div>
        </div>
    );
}
