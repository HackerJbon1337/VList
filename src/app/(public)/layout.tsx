import { Header, Footer } from "@/components/layout";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
        </div>
    );
}
