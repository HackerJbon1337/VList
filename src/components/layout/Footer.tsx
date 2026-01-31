import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                VList
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            The marketplace where you discover amazing products without friction.
                        </p>
                    </div>

                    {/* Marketplace */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Marketplace</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/marketplace" className="hover:text-foreground transition-colors">
                                    Browse Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-foreground transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/sellers" className="hover:text-foreground transition-colors">
                                    Sellers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-foreground transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-border/40 pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} VList. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
