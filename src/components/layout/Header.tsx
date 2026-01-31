import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        VList
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/marketplace"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Marketplace
                    </Link>
                    <Link
                        href="/categories"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
