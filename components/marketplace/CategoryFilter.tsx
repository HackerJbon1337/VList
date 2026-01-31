"use client";

interface CategoryFilterProps {
    categories: readonly string[];
    selected: string;
    onSelect: (category: string) => void;
}

export function CategoryFilter({
    categories,
    selected,
    onSelect,
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
