-- Migration to fix reviews table column name
-- Run this in Supabase SQL Editor if you have 'name' instead of 'user_name'

-- Check if 'name' column exists and rename it to 'user_name'
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='reviews' AND column_name='name'
    ) THEN
        ALTER TABLE reviews RENAME COLUMN name TO user_name;
    END IF;
END $$;

-- Or if the table doesn't exist yet, create it with the correct schema
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
