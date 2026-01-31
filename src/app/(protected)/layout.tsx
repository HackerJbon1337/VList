"use client";

import { Header, Footer } from "@/components/layout";
import { AuthGuard } from "@/components/auth";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 bg-muted/20">{children}</main>
                <Footer />
            </div>
        </AuthGuard>
    );
}
