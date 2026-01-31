"use client";

import { MapPin } from "lucide-react";

interface LocationFilterProps {
    locations: readonly string[];
    selected: string;
    onSelect: (location: string) => void;
}

export function LocationFilter({
    locations,
    selected,
    onSelect,
}: LocationFilterProps) {
    return (
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
                value={selected}
                onChange={(e) => onSelect(e.target.value)}
                className="h-10 w-full appearance-none rounded-full border border-input bg-background pl-9 pr-8 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[180px]"
            >
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6" /></svg>
            </div>
        </div>
    );
}
