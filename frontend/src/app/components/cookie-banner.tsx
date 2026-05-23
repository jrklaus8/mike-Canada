"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("pipeda_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("pipeda_consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-xl z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm">
                We use necessary cookies to authenticate your session and optional cookies to analyze site traffic, in compliance with PIPEDA. By clicking "Accept", you consent to our use of cookies. 
                Read our <Link href="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link> for details.
            </div>
            <div className="flex shrink-0 gap-3">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-black bg-white hover:bg-gray-100"
                    onClick={handleAccept}
                >
                    Accept
                </Button>
            </div>
        </div>
    );
}
