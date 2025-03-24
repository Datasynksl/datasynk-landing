-- Create datasets table
CREATE TABLE IF NOT EXISTS public.datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  size BIGINT,
  parameters JSONB,
  sample_data JSONB,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  access_count INTEGER DEFAULT 0 NOT NULL,
  view_count INTEGER DEFAULT 0 NOT NULL
);

-- Add RLS policies
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read datasets
CREATE POLICY "Allow anonymous read access to datasets"
  ON public.datasets
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to read datasets
CREATE POLICY "Allow authenticated read access to datasets"
  ON public.datasets
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role to manage datasets
CREATE POLICY "Allow service role to manage datasets"
  ON public.datasets
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for datasets
INSERT INTO storage.buckets (id, name, public)
VALUES ('datasets', 'datasets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous users to read from the datasets bucket
CREATE POLICY "Allow anonymous read access to datasets bucket"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'datasets');

-- Allow authenticated users to read from the datasets bucket
CREATE POLICY "Allow authenticated read access to datasets bucket"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'datasets');

-- Allow service role to manage objects in the datasets bucket
CREATE POLICY "Allow service role to manage datasets bucket"
  ON storage.objects
  TO service_role
  USING (bucket_id = 'datasets')
  WITH CHECK (bucket_id = 'datasets');

