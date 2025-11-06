-- Fix for anonymous reviews compatibility
-- Run this SQL in your Supabase SQL Editor

-- Option 1: Make user_id nullable for anonymous reviews (Recommended)
ALTER TABLE public.reviews 
  ALTER COLUMN user_id DROP NOT NULL;

-- Add a column to store reviewer name for anonymous reviews
ALTER TABLE public.reviews 
  ADD COLUMN IF NOT EXISTS reviewer_name TEXT;

-- Update existing reviews to move title to reviewer_name if needed
UPDATE public.reviews 
SET reviewer_name = title 
WHERE reviewer_name IS NULL AND title IS NOT NULL;

-- Now we can use reviewer_name for display purposes
-- The title field can be used for actual review titles

-- Optional: Add index for performance
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_name ON public.reviews(reviewer_name);
