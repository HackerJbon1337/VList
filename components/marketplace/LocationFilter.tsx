"use client";

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
        <select
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            {locations.map((location) => (
                <option key={location} value={location}>
                    {location}
                </option>
            ))}
        </select>
    );
}
