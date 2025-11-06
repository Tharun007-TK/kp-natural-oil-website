# KP Natural Oil Website - Complete Setup & Running Guide

A modern e-commerce website for KP Natural Hairoils built with Next.js 14, Supabase, and TailwindCSS featuring product management, customer reviews, and admin dashboard.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** (recommended) - Install: `npm install -g pnpm`
- **Supabase Account** ([Sign up free](https://supabase.com))
- **Git**

### Step-by-Step Setup

#### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Tharun007-TK/kp-natural-oil-website.git
cd kp-natural-oil-website

# Install dependencies
pnpm install
```

#### 2. Configure Environment Variables

Your `.env.local` file should contain:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://uuhpxeqxhfevwsadhblq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=sarathykalpana17@gmail.com
DEFAULT_ADMIN_PASSWORD=test
ADMIN_AUTO_SEED=false
```

**Get your Supabase keys:**

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the URL and keys

#### 3. Set Up Database (CRITICAL STEP)

Go to your Supabase project → **SQL Editor** and run these scripts **in order**:

**Step 1: Main Schema**

```bash
# Open file: supabase-migration.sql
# Copy ALL content → Paste in Supabase SQL Editor → Run
```

**Step 2: Anonymous Reviews Fix** ⚠️ **REQUIRED**

```bash
# Open file: supabase-fix-anonymous-reviews.sql
# Copy ALL content → Paste in Supabase SQL Editor → Run
```

Or run this SQL directly in Supabase:

```sql
-- Make user_id nullable for anonymous reviews
ALTER TABLE public.reviews ALTER COLUMN user_id DROP NOT NULL;

-- Add reviewer_name column
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS reviewer_name TEXT;

-- Add index
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_name ON public.reviews(reviewer_name);
```

#### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 📱 Using the Application

### Public Pages

- **Home** - `/` - Landing page
- **Products** - `/products` - Browse all products
- **Product Detail** - `/product/[id]` - View product & submit reviews
- **Reviews** - `/reviews` - See all customer reviews

### Admin Panel

1. **Access**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. **Login** with credentials from `.env.local`:
   - Email: `sarathykalpana17@gmail.com`
   - Password: `test`
3. **Features**:
   - **Price Management** - Update product prices and offers
   - **Products** - Add/Edit/Delete products
   - **Users** - Create admin users

### How to Add Products

1. Login to admin at `/admin/login`
2. Go to "Products" tab
3. Fill the form:
   - **Name**: Product name (e.g., "KP Natural Hair Oil - Classic")
   - **Description**: Product details
   - **Price**: Numeric value (e.g., 145)
   - **Image URL**: Path (e.g., `/product1.png`)
4. Click "Add Product"
5. Product appears on `/products` page immediately!

### How Customers Submit Reviews

1. Visit any product page (e.g., `/product/[id]`)
2. Scroll to "Write a Review"
3. Enter name, select rating (1-5 stars), write comment
4. Click "Submit Review"
5. Review saved to database and displays instantly!

## ✨ Features

### Public Features

- 🛍️ **Product Catalog** - Browse natural oil products with images and pricing
- ⭐ **Customer Reviews** - View and submit product reviews (anonymous supported)
- 🌍 **Multilingual** - English and Tamil language support with i18next
- 🌓 **Dark/Light Mode** - Theme toggle with OS preference detection
- 📱 **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- 💬 **WhatsApp Integration** - Quick contact button

### Admin Features

- 🔐 **Authentication** - Secure login with Supabase Auth
- 💰 **Price Management** - Update product prices and special offers
- 📦 **Product CRUD** - Add, edit, delete products with image URLs
- 👥 **User Management** - Create admin users
- 🔄 **Real-time Updates** - Changes reflect immediately on public pages

## 🗄️ Database Schema

### Tables

#### `profiles`

```sql
- id: UUID (primary key, references auth.users)
- email: TEXT
- is_admin: BOOLEAN (default: false)
- created_at: TIMESTAMP
```

#### `products`

```sql
- id: UUID (primary key, auto-generated)
- name: TEXT (required)
- description: TEXT
- price: NUMERIC (required)
- image_url: TEXT
- average_rating: NUMERIC (0-5)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### `reviews`

```sql
- id: UUID (primary key, auto-generated)
- product_id: UUID (foreign key → products.id)
- user_id: UUID (nullable, foreign key → auth.users.id)
- reviewer_name: TEXT (required for anonymous reviews)
- rating: INTEGER (1-5, required)
- title: TEXT
- comment: TEXT
- verified: BOOLEAN (default: false)
- created_at: TIMESTAMP
```

**Important**: The `reviews` table supports both authenticated and anonymous reviews:

- **Authenticated**: user_id is set, reviewer_name from profile
- **Anonymous**: user_id is NULL, reviewer_name from form input

## 🏗️ Project Structure

```
kp-natural-oil-website/
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home/landing page
│   ├── globals.css                   # Global styles
│   ├── products/
│   │   └── page.tsx                  # Product listing (fetches from DB)
│   ├── product/
│   │   └── [id]/page.tsx            # Product detail + review form
│   ├── reviews/
│   │   └── page.tsx                  # All reviews + submission form
│   ├── admin/
│   │   ├── page.tsx                  # Admin gatekeeper (redirects)
│   │   ├── login/page.tsx           # Admin login
│   │   ├── reset-password/page.tsx  # Password reset
│   │   └── dashboard/page.tsx       # Admin dashboard (pricing, products, users)
│   └── api/
│       ├── products/
│       │   ├── route.ts             # GET all, POST create
│       │   └── [id]/route.ts        # GET, PUT, DELETE single product
│       ├── reviews/
│       │   └── route.ts             # GET all/by product, POST create
│       ├── public/
│       │   └── pricing/route.ts     # GET/POST pricing updates
│       └── admin/
│           ├── users/route.ts       # User management
│           ├── pricing/route.ts     # Admin pricing API
│           └── ensure-default/route.ts  # Auto-seed admin
├── components/
│   ├── site-header.tsx              # Navigation header
│   ├── product-carousel.tsx         # Product display carousel
│   ├── reviews-section.tsx          # Reviews display component
│   ├── dynamic-pricing.tsx          # Price display with offers
│   ├── whatsapp-button.tsx          # Contact button
│   ├── theme-provider.tsx           # Dark/light mode provider
│   ├── language-provider.tsx        # i18n provider
│   └── ui/                          # Shadcn UI components
├── lib/
│   ├── supabase-client.ts           # Browser Supabase client
│   ├── supabase-server.ts           # Server Supabase client (service role)
│   ├── admin-auth.ts                # Admin authentication helpers
│   ├── admin-middleware.ts          # Admin route protection
│   ├── pricing-store.ts             # Pricing state management
│   └── utils.ts                     # Utility functions (cn, etc.)
├── public/
│   └── locales/
│       ├── en/common.json           # English translations
│       └── ta/common.json           # Tamil translations
├── supabase-migration.sql           # Main database schema
├── supabase-fix-anonymous-reviews.sql  # Anonymous reviews migration
├── middleware.ts                    # Next.js middleware
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🔌 API Endpoints

### Products

**GET** `/api/products`

- Returns: Array of all products
- Auth: Public

**GET** `/api/products/[id]`

- Returns: Single product by ID
- Auth: Public

**POST** `/api/products`

- Body: `{ name, description, price, image_url }`
- Returns: Created product
- Auth: Admin (service role)

**PUT** `/api/products/[id]`

- Body: `{ name?, description?, price?, image_url? }`
- Returns: Updated product
- Auth: Admin (service role)

**DELETE** `/api/products/[id]`

- Returns: Success message
- Auth: Admin (service role)

### Reviews

**GET** `/api/reviews`

- Query: `?product_id=xxx` (optional, filter by product)
- Returns: Array of reviews with product info
- Auth: Public

**POST** `/api/reviews`

- Body: `{ product_id, reviewer_name, rating, title?, comment? }`
- Returns: Created review
- Auth: Public (anonymous supported)

### Admin

**GET** `/api/admin/users`

- Returns: List of admin users
- Auth: Admin only (validates email allowlist)

**POST** `/api/admin/users`

- Body: `{ email, password, is_admin }`
- Returns: Created user
- Auth: Admin only

**GET/POST** `/api/admin/pricing`

- GET: Returns current pricing
- POST: Updates pricing/offers
- Auth: Admin only

## Environment variables

Create a `.env.local` in the project root with the following variables.

```
# Supabase (Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side service role key (NEVER expose publicly)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin allowlist (email that can access the Admin area)
NEXT_PUBLIC_ADMIN_EMAIL=sarathykalpana17@gmail.com

# Optional: auto-seed a default admin account via /api/admin/ensure-default
# Set to 'true' temporarily in development to create the account
ADMIN_AUTO_SEED=false

# Only used when ADMIN_AUTO_SEED=true
DEFAULT_ADMIN_PASSWORD=test
```

Notes:

- The app guards Supabase client creation at build time. If you forget to set the env vars, features depending on Supabase just won’t initialize in the browser instead of crashing the build.
- Service role key is used only on the server (API routes) – keep it secret.

## Install & run (Windows PowerShell)

Using pnpm (recommended):

```powershell
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000
```

Production build:

```powershell
pnpm build
pnpm start
```

## Admin usage

- Admin entry points:
  - `/admin` → Redirects you to login or dashboard
  - `/admin/login` → Admin login form with forgot password
  - `/admin/reset-password`→ Password update page (via email link)
  - `/admin/dashboard` → Authenticated dashboard (pricing + users)
- The public site header intentionally doesn’t include an Admin link; it’s “only via /admin.”

### Default admin seeding (optional)

1. Set in `.env.local`:
   - `ADMIN_AUTO_SEED=true`
   - `NEXT_PUBLIC_ADMIN_EMAIL=sarathykalpana17@gmail.com`
   - `DEFAULT_ADMIN_PASSWORD=test`
2. Start the dev server and visit `/admin/login` once – this triggers `/api/admin/ensure-default`.
3. Set `ADMIN_AUTO_SEED=false` afterwards for safety.

### Users management

- The Users tab in the dashboard uses the current Supabase session’s bearer token to call `/api/admin/users`.
- Allowed Admin email is checked on the server before listing/creating users.

## i18n

- JSON resources live under `public/locales/{en,ta}/common.json`.
- A custom `LanguageProvider` manages the current language and syncs with `react-i18next`.
- The header includes a language toggle; the rest of the site reads translations from i18next.

## Theme (dark/light)

- Theme is controlled by `ThemeProvider` in `app/layout.tsx`.
- Admin pages have explicit dark variants for borders, backgrounds, and text to maximize contrast.
- Use the theme toggle in the header to switch between modes or follow the OS setting.

## Scripts

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Troubleshooting

- “supabaseUrl is required” during build or runtime

  - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.
  - The app uses a lazy client factory to avoid build failures, but runtime features still need valid env vars.

- Can’t access Admin after login or Users API returns 401

  - Verify your account email matches `NEXT_PUBLIC_ADMIN_EMAIL`.
  - Confirm the Supabase project auth settings and that you’re signed in.

- Password reset link doesn’t sign you in
  - The reset flow expects Supabase to set the session from the link. Ensure `redirectTo` was generated with your correct origin (dev vs prod).

## Security notes

- The `SUPABASE_SERVICE_ROLE_KEY` is used only in server routes under `/api/admin/*` and must not be exposed to the client.
- Admin APIs validate the bearer token and also enforce an allowlisted Admin email.
- Row Level Security (RLS) policies protect database tables.
- Never commit `.env.local` or any secrets to version control.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**

- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_ADMIN_EMAIL`
- Deploy!

3. **Update Supabase Redirect URLs**

- Go to Supabase → Authentication → URL Configuration
- Add your Vercel domain to allowed redirect URLs

### Other Platforms

- **Netlify**: Use Next.js plugin, add env vars
- **Railway**: Auto-detects Next.js, add env vars
- **Self-hosted**: Run `pnpm build && pnpm start` with Node.js 18+

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS v4.1.16
- **Components**: Shadcn UI + Radix UI primitives
- **Icons**: Lucide React
- **Internationalization**: next-i18next, react-i18next

### Backend

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js Route Handlers (REST)
- **ORM**: Supabase JavaScript Client

### Development

- **Package Manager**: pnpm 10.12.1
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode

## 📞 Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review Supabase logs in dashboard
3. Check browser console for errors
4. Verify all environment variables are set correctly

---

**Happy coding! 🎉**

## License

This repository is provided as-is for demonstration and internal use. Update licensing as needed for your deployment.
