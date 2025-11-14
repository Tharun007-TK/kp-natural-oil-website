"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface PricingData {
  currentPrice: string;
  currentOffer: string;
  isOfferActive: boolean;
}

export default function DynamicPricing() {
  // Start with null so we don't show a stale hard-coded price that later "flickers" to the real value.
  const [pricingData, setPricingData] = useState<PricingData | null>(null);

  useEffect(() => {
    // 1) Try to hydrate immediately from last-known value (client-side cache)
    try {
      const cached = localStorage.getItem("pricingData");
      if (cached) {
        const parsed = JSON.parse(cached) as PricingData;
        if (parsed?.currentPrice) setPricingData(parsed);
      }
    } catch (e) {
      // ignore cache errors
    }

    const fetchPricingData = async () => {
      try {
        const response = await fetch("/api/public/pricing");
        if (response.ok) {
          const data = await response.json();
          setPricingData(data);
          try {
            localStorage.setItem("pricingData", JSON.stringify(data));
          } catch (e) {
            // ignore storage errors
          }
        }
      } catch (error) {
        console.error("Failed to fetch pricing data:", error);
      }
    };

    fetchPricingData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchPricingData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Loading placeholder (simple skeleton). Avoid showing old static price.
  if (!pricingData) {
    return (
      <div className="flex items-center gap-3 mb-4" aria-busy="true">
        <div className="h-8 w-20 rounded bg-muted animate-pulse" />
        <div className="h-6 w-24 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-4"
      aria-live="polite"
    >
      <span className="text-3xl sm:text-4xl font-black text-primary">
        {pricingData.currentPrice}
      </span>
      {pricingData.isOfferActive && (
        <Badge className="bg-red-600 hover:bg-red-700 text-white shadow-md border-0 text-xs sm:text-sm px-2 py-1 sm:px-3 transition-colors">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
          {pricingData.currentOffer}
        </Badge>
      )}
    </div>
  );
}
