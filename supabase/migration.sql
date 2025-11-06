-- ==============================================================
--  EXTENSIONS
-- ==============================================================

-- Required for UUID generation
create extension if not exists "pgcrypto";

-- ==============================================================
--  PROFILES (linked with Supabase Auth)
-- ==============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  is_admin boolean default false,
  created_at timestamptz not null default now()
);

-- ==============================================================
--  PRODUCTS
-- ==============================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  tags text[],
  price numeric not null check (price >= 0),
  image_url text,
  average_rating numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==============================================================
--  REVIEWS
-- ==============================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  comment text,
  verified boolean default false,
  created_at timestamptz not null default now()
);

-- ==============================================================
--  TRIGGERS
-- ==============================================================

-- Function to auto-update updated_at column
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop existing trigger (if exists) and recreate
drop trigger if exists trg_products_set_updated_at on public.products;
create trigger trg_products_set_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

-- ==============================================================
--  AVERAGE RATING TRIGGER
-- ==============================================================

-- Function to auto-update product average rating
create or replace function public.update_product_average_rating()
returns trigger as $$
begin
  update public.products
  set average_rating = (
    select coalesce(avg(rating), 0)
    from public.reviews
    where product_id = new.product_id
  )
  where id = new.product_id;
  return null;
end;
$$ language plpgsql;

-- Trigger for insert/update/delete of reviews
drop trigger if exists trg_update_product_rating on public.reviews;
create trigger trg_update_product_rating
after insert or update or delete on public.reviews
for each row execute procedure public.update_product_average_rating();

-- ==============================================================
--  INDEXES (Performance)
-- ==============================================================

create index if not exists idx_reviews_product_id on public.reviews(product_id);
create index if not exists idx_reviews_user_id on public.reviews(user_id);
create index if not exists idx_products_category on public.products(category);

-- ==============================================================
--  RLS POLICIES (Optional)
-- ==============================================================

-- Enable Row-Level Security if using anon key
-- alter table public.products enable row level security;
-- alter table public.reviews enable row level security;
-- alter table public.profiles enable row level security;

-- -- Anyone can read products
-- create policy "Public can view products"
--   on public.products for select using (true);

-- -- Anyone can view reviews
-- create policy "Public can view reviews"
--   on public.reviews for select using (true);

-- -- Only admins can modify products
-- create policy "Admins can modify products"
--   on public.products for all
--   using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
--   with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- -- Authenticated users can post reviews
-- create policy "Users can insert own reviews"
--   on public.reviews for insert
--   with check (auth.uid() = user_id);

-- -- Users can delete their own reviews
-- create policy "Users can delete own reviews"
--   on public.reviews for delete
--   using (auth.uid() = user_id);

-- -- Profiles are readable by self or admins
-- create policy "Users can read own profile or admins can read all"
--   on public.profiles for select
--   using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- ==============================================================
