
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  application_type TEXT,
  material_required TEXT,
  monthly_quantity TEXT,
  drawing_url TEXT,
  required_timeline TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public RFQ form)
CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests
  FOR INSERT
  WITH CHECK (true);

-- No public select/update/delete (admin-only later)
CREATE POLICY "No public read access"
  ON public.quote_requests
  FOR SELECT
  USING (false);

-- Storage bucket for drawing uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('drawings', 'drawings', false);

CREATE POLICY "Anyone can upload drawings"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'drawings');

CREATE POLICY "No public read on drawings"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'drawings' AND false);
