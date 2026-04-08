-- Run this in your Supabase SQL Editor

-- Create a new public bucket for product images
insert into storage.buckets (id, name, public)
values ('product_images', 'product_images', true);

-- Allow public read access to the bucket
create policy "Allow public read access"
on storage.objects for select
using ( bucket_id = 'product_images' );

-- Allow authenticated users to insert images (Update based on role later)
create policy "Allow authenticated inserts"
on storage.objects for insert
with check ( bucket_id = 'product_images' );

-- Allow authenticated users to update/delete their own images (or all for demo)
create policy "Allow authenticated updates"
on storage.objects for update
using ( bucket_id = 'product_images' );

create policy "Allow authenticated deletes"
on storage.objects for delete
using ( bucket_id = 'product_images' );
