-- Run this in Supabase SQL Editor if tables already exist but website gets "permission denied"
-- Safe to run after initial schema.sql

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON trusted_customers TO anon, authenticated;
GRANT SELECT ON google_reviews TO anon, authenticated;
