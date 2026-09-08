CREATE TABLE public.worker_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'English',
  stage TEXT NOT NULL DEFAULT 'registered',
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.worker_profiles TO authenticated;
GRANT ALL ON public.worker_profiles TO service_role;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.worker_profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.bank_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  account_holder_name TEXT NOT NULL,
  account_last4 TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  branch TEXT,
  ifsc TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_details TO authenticated;
GRANT ALL ON public.bank_details TO service_role;
ALTER TABLE public.bank_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bank" ON public.bank_details FOR ALL TO authenticated USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);

CREATE TABLE public.kyc_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  route TEXT NOT NULL,
  document_type TEXT NOT NULL,
  document_last4 TEXT NOT NULL,
  name_on_document TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kyc_records TO authenticated;
GRANT ALL ON public.kyc_records TO service_role;
ALTER TABLE public.kyc_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own kyc" ON public.kyc_records FOR ALL TO authenticated USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);

CREATE TABLE public.skill_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  trade TEXT NOT NULL,
  route TEXT NOT NULL,
  certificate_name TEXT,
  issuing_body TEXT,
  years_experience INTEGER,
  evidence_notes TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skill_claims TO authenticated;
GRANT ALL ON public.skill_claims TO service_role;
ALTER TABLE public.skill_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own skills" ON public.skill_claims FOR ALL TO authenticated USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);

CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  amount_inr INTEGER NOT NULL DEFAULT 500,
  status TEXT NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  valid_until DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own membership" ON public.memberships FOR ALL TO authenticated USING (auth.uid() = worker_id) WITH CHECK (auth.uid() = worker_id);