# Supabase Integration Setup Guide

This guide will walk you through setting up Supabase for product and review management in the KP Natural Oil Website.

## Prerequisites

- A Supabase account (https://supabase.com)
- Project environment variables configured in `.env.local`

## Step 1: Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Wait for the project to be fully provisioned
3. Navigate to Project Settings > API
4. Copy your project URL and anon key

## Step 2: Configure Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 3: Run Database Migration

1. Open your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase-migration.sql`
4. Paste and run the SQL in the editor

This will:

- Create `products` and `reviews` tables
- Set up foreign key relationships
- Configure Row Level Security (RLS) policies
- Add indexes for performance
- Insert sample data (optional - you can remove these INSERT statements)

## Step 4: Verify Tables

In the Supabase dashboard:

1. Go to Table Editor
2. Verify that `products` and `reviews` tables exist
3. Check that sample data is present (if you included the INSERT statements)

## Database Schema

### Products Table

```
id          UUID (Primary Key)
name        TEXT (NOT NULL)
description TEXT (NOT NULL)
price       NUMERIC(10, 2) (NOT NULL)
image_url   TEXT
created_at  TIMESTAMP WITH TIME ZONE
updated_at  TIMESTAMP WITH TIME ZONE
```

### Reviews Table

```
id          UUID (Primary Key)
product_id  UUID (Foreign Key -> products.id)
user_name   TEXT (NOT NULL)
rating      INTEGER (1-5)
comment     TEXT (NOT NULL)
created_at  TIMESTAMP WITH TIME ZONE
```

## Features Implemented

### Admin Dashboard (`/admin/dashboard`)

- **Product Management Tab**:
  - Add new products with name, description, price, and image URL
  - Edit existing products
  - Delete products
  - View all products in a grid layout

### Products Page (`/products`)

- Fetches all products from Supabase
- Displays products in a responsive grid
- Shows product name, description, price, and image
- "View Details" button links to individual product pages
- "Order" button opens WhatsApp with product details

### Product Detail Page (`/product/[id]`)

- Displays full product information
- Shows all reviews for the product
- Displays average rating
- Review submission form with:
  - User name input
  - Star rating selector (1-5)
  - Comment textarea
- WhatsApp order button with product details

### API Routes

#### `/api/products`

- **GET**: Fetch all products
- **POST**: Create new product (admin)
- **PUT**: Update product (admin)
- **DELETE**: Delete product (admin)

#### `/api/products/[id]`

- **GET**: Fetch single product by ID

#### `/api/reviews`

- **GET**: Fetch reviews by product_id
- **POST**: Create new review

## Security

- **Row Level Security (RLS)** is enabled on both tables
- Public read access for products and reviews
- Public insert access for reviews (user submissions)
- Admin operations use service role key for full access
- Admin routes protected by authentication middleware

## Testing

1. **Start the dev server**:

   ```bash
   pnpm dev
   ```

2. **Test Product Management**:

   - Navigate to `/admin/login`
   - Login with your admin credentials
   - Go to the "Products" tab
   - Add a test product
   - Verify it appears on `/products`

3. **Test Product Details & Reviews**:

   - Click "View Details" on any product
   - Submit a review
   - Verify the review appears immediately

4. **Test CRUD Operations**:
   - Create: Add a new product
   - Read: View products list and details
   - Update: Edit a product's information
   - Delete: Remove a product

## Sample Product Data

You can manually add products through the admin panel or use this sample data in Supabase SQL Editor:

```sql
INSERT INTO products (name, description, price, image_url) VALUES
  (
    'KP Natural Hair Oil - Classic',
    'Our premium sulfur-free hair oil infused with hibiscus, coconut, and rosemary. Perfect for all hair types.',
    145.00,
    '/product1.png'
  ),
  (
    'KP Natural Hair Oil - Intense',
    'Extra strength formula for damaged and weak hair. Contains our secret herbal blend.',
    185.00,
    '/product2.png'
  );
```

## Troubleshooting

### Products not loading

- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Verify tables exist in Supabase Table Editor
- Check browser console for errors

### Cannot create/update products

- Ensure `SUPABASE_SERVICE_ROLE_KEY` is configured
- Verify RLS policies are set correctly
- Check that you're logged in as admin

### Reviews not submitting

- Check that product_id exists in products table
- Verify rating is between 1-5
- Ensure all required fields are filled
- **If you get "Could not find the 'user_name' column" error:**
  - Your reviews table might have been created with a different schema
  - Run the SQL in `supabase-fix-reviews-column.sql` to rename the column
  - Or drop and recreate the reviews table with the correct schema from `supabase-migration.sql`

## Next Steps

- Upload product images to Supabase Storage
- Add image upload functionality to admin panel
- Implement review moderation
- Add pagination for products and reviews
- Implement search and filter functionality
