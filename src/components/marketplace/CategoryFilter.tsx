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
        <div className="flex w-full gap-2 overflow-x-auto pb-4 no-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected === category
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-border"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
