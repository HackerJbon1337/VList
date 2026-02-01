"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categories, locations, Product } from "@/lib/products";
import { useAuthStore } from "@/store";
import { Loader2, Upload } from "lucide-react";

// Types remain same...
type ProductType = "Sell" | "Trade" | "Donate";
type Condition = "New" | "Like New" | "Good" | "Fair" | "Poor";

interface ListingFormData {
    title: string;
    description: string;
    price: string;
    category: string;
    location: string;
    condition: Condition;
    type: ProductType;
    image: string;
}

const initialFormData: ListingFormData = {
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    condition: "Good",
    type: "Sell",
    image: "",
};

export function CreateListingForm() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState<ListingFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handlers remain same...
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "type" && value === "Donate") {
            setFormData((prev) => ({ ...prev, price: "0" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Minimal Validation
        if (!formData.title.trim()) { setError("Title is required"); return; }
        if (!formData.category) { setError("Category is required"); return; }
        if (!formData.location) { setError("Location is required"); return; }
        if (formData.type === "Sell" && (!formData.price || Number(formData.price) <= 0)) {
            setError("Price is required");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price) || 0,
                    image: formData.image || "https://picsum.photos/seed/default/400/300",
                    category: formData.category,
                    location: formData.location || "North Campus",
                    condition: formData.condition,
                    type: formData.type,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to create listing");
                setIsSubmitting(false);
                return;
            }

            console.log("Created:", data.product);
            router.push("/marketplace");
        } catch (err) {
            setError("Failed to create listing. Please try again.");
            setIsSubmitting(false);
        }
    };

    const generateRandomImage = () => {
        const seed = Math.random().toString(36).substring(7);
        setFormData((prev) => ({
            ...prev,
            image: `https://picsum.photos/seed/${seed}/400/300`,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            {error && (
                <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium">
                    {error}
                </div>
            )}

            {/* Section: Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Listing Type</label>
                <div className="grid grid-cols-3 gap-3">
                    {(["Sell", "Trade", "Donate"] as ProductType[]).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    type,
                                    price: type === "Donate" ? "0" : prev.price,
                                }))
                            }
                            className={`flex h-12 items-center justify-center rounded-md border text-sm font-medium transition-all ${formData.type === type
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Section: Details */}
            <div className="space-y-6 rounded-lg border border-border p-6 bg-card">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="What are you listing?"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {formData.type !== "Donate" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price (₹)</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select...</option>
                                {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">Select...</option>
                                {locations.slice(1).map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Condition</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {(["New", "Like New", "Good", "Fair", "Poor"] as Condition[]).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Section: Photos */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Photos</label>
                <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-3">
                        {/* Upload Buttons */}
                        <div className="flex gap-2">
                            <label className="flex-1 flex items-center justify-center gap-2 h-10 px-4 border border-input rounded-md hover:bg-accent cursor-pointer text-sm">
                                <Upload className="h-4 w-4" />
                                <span>Gallery</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFormData(prev => ({ ...prev, image: reader.result as string }));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                            <label className="flex-1 flex items-center justify-center gap-2 h-10 px-4 border border-input rounded-md hover:bg-accent cursor-pointer text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                <span>Camera</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFormData(prev => ({ ...prev, image: reader.result as string }));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-muted-foreground">Tip: Add clear photos to sell 50% faster.</p>
                    </div>

                    {formData.image ? (
                        <div className="relative h-24 w-32 rounded-md overflow-hidden border border-border bg-muted">
                            <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                    ) : (
                        <div className="flex h-24 w-32 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/50">
                            <Upload className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 border-t border-border">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-md bg-primary h-11 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</> : "Post Listing"}
                </button>
            </div>
        </form>
    );
}
