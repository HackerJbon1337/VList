import { Header, Footer } from "@/components/layout";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Add auth check here (e.g., redirect to /login if not authenticated)
    // For now, this is a placeholder that wraps protected content

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-muted/20">{children}</main>
            <Footer />
        </div>
    );
}
