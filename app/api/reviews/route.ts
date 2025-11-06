import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-client";

// GET reviews - all reviews or for a specific product
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    let query = supabase
      .from("reviews")
      .select(
        "id, product_id, user_id, rating, title, comment, verified, reviewer_name, created_at, products(name, image_url)"
      )
      .order("created_at", { ascending: false });

    // If product_id is provided, filter by it
    if (productId) {
      query = query.eq("product_id", productId);
    }

    const { data: reviews, error } = await query;

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    // Map reviewer_name to user_name for frontend compatibility
    const formattedReviews = reviews?.map((review: any) => ({
      ...review,
      user_name: review.reviewer_name || "Anonymous",
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create new review
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { product_id, user_name, rating, comment, title } = body;

    if (!product_id || !user_name || !rating || !comment) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: product_id, user_name, rating, comment",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        product_id,
        user_id: null, // Null for anonymous reviews
        reviewer_name: user_name, // Store the user's name
        rating: parseInt(rating),
        title: title || null,
        comment,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating review:", error);
      return NextResponse.json(
        { error: "Failed to create review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
