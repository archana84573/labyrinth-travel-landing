/*
# Create subscribers table (single-tenant, no auth)

1. New Tables
- `subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — the email address a visitor submits in the "Plan a journey" / newsletter form
  - `source` (text, nullable) — where on the site the signup came from, e.g. 'cta'
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `subscribers`.
- This is a no-auth public landing page, so the anon-key client must be able to INSERT
  new signups. Reads are intentionally public-lite (anyone can read) for simplicity on
  a marketing page, but writes are insert-only.
- Policies:
  - SELECT: allow anon + authenticated (so the app can check for existing emails)
  - INSERT: allow anon + authenticated (so visitors can sign up without logging in)
  - No UPDATE or DELETE policies — signups are append-only from the frontend.

3. Notes
- Idempotent: uses CREATE TABLE IF NOT EXISTS and drops policies before recreating.
- Email uniqueness is enforced at the DB level via UNIQUE constraint.
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_subscribers" ON subscribers;
CREATE POLICY "anon_select_subscribers" ON subscribers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers" ON subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);
