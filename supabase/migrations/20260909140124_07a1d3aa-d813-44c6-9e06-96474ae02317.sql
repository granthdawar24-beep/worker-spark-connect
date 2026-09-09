ALTER TABLE public.worker_profiles
  ADD COLUMN IF NOT EXISTS job_interests text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS preferred_cities text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS preferred_areas text NULL;