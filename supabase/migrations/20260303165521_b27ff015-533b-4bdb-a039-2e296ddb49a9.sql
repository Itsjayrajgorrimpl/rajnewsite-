
-- ============================================
-- 1. PAGES CMS TABLE
-- ============================================
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  content JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read published pages" ON public.pages FOR SELECT
  USING (status = 'published');

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 2. UPGRADE PRODUCT_CONTENT TABLE
-- ============================================
ALTER TABLE public.product_content
  ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS applications JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';

-- ============================================
-- 3. INDUSTRIES TABLE
-- ============================================
CREATE TABLE public.industries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  hero_image TEXT,
  description TEXT,
  components_supported JSONB DEFAULT '[]'::jsonb,
  engineering_focus JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage industries" ON public.industries FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read published industries" ON public.industries FOR SELECT
  USING (status = 'published');

CREATE TRIGGER update_industries_updated_at BEFORE UPDATE ON public.industries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. BLOG CATEGORIES TABLE
-- ============================================
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blog categories" ON public.blog_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read blog categories" ON public.blog_categories FOR SELECT
  USING (true);

-- ============================================
-- 5. UPGRADE BLOG_POSTS TABLE
-- ============================================
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS meta_title TEXT;

-- ============================================
-- 6. GLOBAL SEO SETTINGS TABLE (singleton)
-- ============================================
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT,
  site_meta_description TEXT,
  google_analytics_id TEXT,
  google_tag_manager_id TEXT,
  facebook_pixel_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage seo settings" ON public.seo_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read seo settings" ON public.seo_settings FOR SELECT
  USING (true);

-- Insert default row
INSERT INTO public.seo_settings (site_title, site_meta_description)
VALUES ('Raj Industries', 'Leading manufacturer of rubber diaphragms, anti-vibration mounts, o-rings and custom moulded rubber components.');

-- ============================================
-- 7. MEDIA FILES TABLE
-- ============================================
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage media" ON public.media_files FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view media" ON public.media_files FOR SELECT
  USING (true);
