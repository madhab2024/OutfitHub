-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text,
  price numeric(10, 2),
  stock_quantity integer DEFAULT 0,
  size text,
  style text,
  description text,
  images text[],
  status text DEFAULT 'Active',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS (Optional depending on your security needs)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Allow public read access on products"
  ON public.products FOR SELECT
  USING (true);

-- Allow insert/update/delete to authenticated shop owners/admins only
-- You will need to link your shop owner policies to auth.uid() here.
-- For now, allowing all for testing purposes.
CREATE POLICY "Allow test insert/update on products"
  ON public.products FOR ALL
  USING (true)
  WITH CHECK (true);
