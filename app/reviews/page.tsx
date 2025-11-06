"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  product_id: string;
  products?: {
    name: string;
    image_url: string | null;
  };
}

export default function ReviewsPage() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [defaultProductId, setDefaultProductId] = useState<string | null>(null);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviewsAndProducts();
  }, []);

  const fetchReviewsAndProducts = async () => {
    setLoading(true);
    try {
      // Fetch all reviews
      const reviewsRes = await fetch("/api/reviews");
      if (reviewsRes.ok) {
        const data = await reviewsRes.json();
        setReviews(data.reviews || []);
      }

      // Fetch products to get a default one for general reviews
      const productsRes = await fetch("/api/products");
      if (productsRes.ok) {
        const data = await productsRes.json();
        if (data.products && data.products.length > 0) {
          // Use the first product as default for general reviews
          setDefaultProductId(data.products[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || !defaultProductId) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: defaultProductId,
          user_name: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (response.ok) {
        setNewReview({ name: "", rating: 5, comment: "" });
        setShowForm(false);
        // Refresh reviews
        await fetchReviewsAndProducts();
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDiscardReview = () => {
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global SiteHeader is rendered via app/layout.tsx */}

      {/* Main Content */}
      <main className="py-6 sm:py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black text-foreground mb-4">
              {t("reviews.title")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
              {t("reviews.subtitle")}
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            >
              {t("reviews.leave")}
            </Button>
          </div>

          {/* Review Form */}
          {showForm && (
            <Card className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {t("reviews.leave")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    required
                    className="text-sm sm:text-base"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            star <= newReview.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder={t("reviews.placeholder")}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                    className="text-sm sm:text-base"
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      onClick={handleDiscardReview}
                      variant="outline"
                      className="text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting || !defaultProductId}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        t("reviews.submit")
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base sm:text-lg font-serif font-bold text-card-foreground">
                        {review.user_name}
                      </CardTitle>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 sm:h-4 sm:w-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                      {review.products && (
                        <span className="ml-2 text-primary">
                          • {review.products.name}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      "{review.comment}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to leave a review!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
