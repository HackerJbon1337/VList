import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Discover Amazing Products{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Without Friction
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                            The marketplace where you can browse freely and only sign in when you&apos;re ready to buy.
                            No barriers, just discovery.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/marketplace"
                                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Browse Marketplace
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="border-t border-border/40 bg-muted/30 py-24">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
                        <p className="mt-4 text-muted-foreground">
                            Simple, straightforward, and designed for you.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {[
                            {
                                step: "1",
                                title: "Browse Freely",
                                description: "Explore products without creating an account. No sign-up required.",
                            },
                            {
                                step: "2",
                                title: "Find What You Love",
                                description: "Use filters, search, and categories to discover perfect products.",
                            },
                            {
                                step: "3",
                                title: "Buy When Ready",
                                description: "Sign in only when you're ready to purchase or contact sellers.",
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="relative rounded-lg border border-border/40 bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Categories</h2>
                        <p className="mt-4 text-muted-foreground">
                            Find exactly what you need across our diverse categories.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: "Electronics", count: "1,234 products" },
                            { name: "Fashion", count: "2,456 products" },
                            { name: "Home & Garden", count: "987 products" },
                            { name: "Sports", count: "654 products" },
                        ].map((category) => (
                            <Link
                                key={category.name}
                                href={`/marketplace?category=${category.name.toLowerCase()}`}
                                className="group rounded-lg border border-border/40 bg-background p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                            >
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">{category.count}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="border-t border-border/40 bg-muted/30 py-24">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { value: "10K+", label: "Active Sellers" },
                            { value: "50K+", label: "Products Listed" },
                            { value: "100K+", label: "Happy Customers" },
                            { value: "99%", label: "Satisfaction Rate" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-12 text-center text-primary-foreground shadow-xl">
                        <h2 className="text-3xl font-bold tracking-tight">Ready to Explore?</h2>
                        <p className="mt-4 text-primary-foreground/80">
                            Join thousands of users discovering amazing products every day.
                        </p>
                        <Link
                            href="/marketplace"
                            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-foreground shadow transition-colors hover:bg-background/90"
                        >
                            Start Browsing Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
