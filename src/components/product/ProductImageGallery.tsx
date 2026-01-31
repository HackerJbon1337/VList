"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
    images: string[];
    title: string;
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // For now we only have one image, but this supports multiple
    const allImages = images.length > 0 ? images : ["https://picsum.photos/seed/placeholder/800/600"];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <Image
                    src={allImages[selectedIndex]}
                    alt={`${title} - Image ${selectedIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${selectedIndex === index
                                    ? "border-primary"
                                    : "border-transparent hover:border-primary/50"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
