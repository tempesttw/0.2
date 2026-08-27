/*
# Create members table for SPARTACUS enrollment

1. New Tables
- `members`
  - `id` (uuid, primary key, defaults to auth user id)
  - `user_id` (uuid, references auth.users ON DELETE CASCADE, unique)
  - `full_name` (text, not null)
  - `phone` (text, not null)
  - `cpf` (text, not null, unique)
  - `plan` (text, not null — 'mensal' | 'trimestral' | 'anual')
  - `status` (text, not null, defaults to 'ativo')
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `members`.
- Owner-scoped CRUD: each authenticated user can only access their own membership row.
- SELECT / INSERT / UPDATE / DELETE policies scoped to `auth.uid() = user_id`.
- `user_id` defaults to `auth.uid()` so inserts omitting it still pass WITH CHECK.

3. Notes
- Email is NOT stored here — it lives in `auth.users`.
- CPF has a unique constraint to prevent duplicate enrollments.
- The frontend creates the auth account first (signUp), then inserts the member row.
*/

CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  cpf text NOT NULL UNIQUE,
  plan text NOT NULL CHECK (plan IN ('mensal', 'trimestral', 'anual')),
  status text NOT NULL DEFAULT 'ativo',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_member" ON members;
CREATE POLICY "select_own_member" ON members FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_member" ON members;
CREATE POLICY "insert_own_member" ON members FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_member" ON members;
CREATE POLICY "update_own_member" ON members FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_member" ON members;
CREATE POLICY "delete_own_member" ON members FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
