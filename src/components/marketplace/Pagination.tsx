"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show max 5 pages with ellipsis
    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;

        if (currentPage <= 3) {
            return [...pages.slice(0, 4), "...", totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, "...", ...pages.slice(-4)];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    return (
        <nav className="flex items-center justify-center gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
                Previous
            </button>

            {getVisiblePages().map((page, index) =>
                typeof page === "string" ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                        {page}
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
                Next
            </button>
        </nav>
    );
}
