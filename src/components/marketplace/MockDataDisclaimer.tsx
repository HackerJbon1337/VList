"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface MockDataDisclaimerProps {
    isMockData: boolean;
}

export function MockDataDisclaimer({ isMockData }: MockDataDisclaimerProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show disclaimer if we're displaying mock data and haven't dismissed it this session
        if (isMockData) {
            const dismissed = sessionStorage.getItem("mockDataDisclaimerDismissed");
            if (!dismissed) {
                setIsVisible(true);
            }
        }
    }, [isMockData]);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("mockDataDisclaimerDismissed", "true");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative max-w-md w-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-4 flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Demo Mode Active</h2>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        You&apos;re currently viewing <strong className="text-foreground">demo/mock data</strong>.
                        These listings are examples to show how VList works.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                        <p className="text-foreground font-medium">What this means:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Products shown are not real listings</li>
                            <li>Seller information is fictional</li>
                            <li>No actual transactions can be made</li>
                        </ul>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Once real students start posting, the demo data will be replaced with actual listings!
                    </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                    <button
                        onClick={handleDismiss}
                        className="w-full flex items-center justify-center gap-2 h-10 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                    >
                        Got it, continue browsing
                    </button>
                </div>

                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
