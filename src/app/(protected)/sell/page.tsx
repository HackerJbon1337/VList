"use client";

import { CreateListingForm } from "@/components/listing";

export default function SellPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create a Listing</h1>
                <p className="mt-2 text-muted-foreground">
                    Sell, trade, or donate items to other students on campus
                </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-6 shadow-sm">
                <CreateListingForm />
            </div>
        </div>
    );
}
