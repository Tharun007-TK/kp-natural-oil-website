"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase-client";
import Image from "next/image";

type Product = {
  id?: string;
  name?: string;
  image_url?: string | null;
  image_urls?: string[] | null;
};

const FALLBACK_IMAGES = [
  {
    src: "/product-carousel-1.webp",
    alt: "KP Naturals Hair Oil with Hibiscus and Coconuts",
  },
  {
    src: "/product-carousel-2.png", // Keep as png if not converted
    alt: "KP Pure Coconut Rosemary Hair Oil Logo",
  },
  {
    src: "/coconut-farm-harvest.webp",
    alt: "Fresh Coconut Harvesting at KP Farm",
  },
  {
    src: "/coconut-shells-processed.webp",
    alt: "Processed Coconut Shells After Oil Extraction",
  },
  {
    src: "/fresh-coconut-halves.webp",
    alt: "Fresh Coconut Halves Ready for Oil Processing",
  },
  {
    src: "/product-carousel-3.png", // Keep as png if not converted
    alt: "KP Naturals Hair Oil with Natural Ingredients",
  },
];

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] =
    useState<{ src: string; alt: string }[]>(FALLBACK_IMAGES);

  useEffect(() => {
    let mounted = true;

    async function fetchProductsClient() {
      try {
        if (!isSupabaseConfigured()) return; // keep fallbacks
        const supabase = getSupabase();
        if (!supabase) return;

        const { data, error } = await supabase
          .from("products")
          .select("name,image_url,image_urls")
          .order("created_at", { ascending: false })
          .limit(12);

        if (error) {
          console.warn("ProductCarousel: supabase error", error);
          return; // keep fallbacks
        }

        const products: Product[] = data || [];
        const uploaded: { src: string; alt: string }[] = [];

        for (const p of products) {
          const arr = (p as any).image_urls as string[] | undefined;
          if (Array.isArray(arr) && arr.length) {
            for (const u of arr)
              if (u) uploaded.push({ src: u, alt: p.name || "Product image" });
            continue;
          }
          if (p.image_url)
            uploaded.push({ src: p.image_url, alt: p.name || "Product image" });
        }

        if (mounted) {
          if (uploaded.length) {
            const seen = new Set<string>();
            const combined: { src: string; alt: string }[] = [];
            for (const u of uploaded) {
              if (!seen.has(u.src)) {
                combined.push(u);
                seen.add(u.src);
              }
            }
            // Fill with fallbacks to reach at least 6 slides
            for (const f of FALLBACK_IMAGES) {
              if (combined.length >= 6) break;
              if (!seen.has(f.src)) {
                combined.push(f);
                seen.add(f.src);
              }
            }
            setImages(combined);
            setCurrentIndex(0);
          } else {
            // no uploads -> keep defaults already set
          }
        }
      } catch (e) {
        // Network failure on client: keep fallbacks silently
        console.warn("ProductCarousel: client fetch failed", e);
      }
    }

    fetchProductsClient();
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:h-[500px] lg:w-auto lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl glass border-white/20 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-10"></div>

        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
              }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
