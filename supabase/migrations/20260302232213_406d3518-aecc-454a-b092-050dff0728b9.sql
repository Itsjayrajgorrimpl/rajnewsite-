
-- Homepage banners
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage banners" ON public.banners FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials / Client logos
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  quote TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);

-- Product content (editable sections for existing product pages)
CREATE TABLE public.product_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL UNIQUE,
  page_title TEXT NOT NULL,
  meta_description TEXT,
  hero_title TEXT,
  hero_description TEXT,
  content JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active product content" ON public.product_content FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage product content" ON public.product_content FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);

CREATE POLICY "Public can view CMS images" ON storage.objects FOR SELECT USING (bucket_id = 'cms-images');
CREATE POLICY "Admins can upload CMS images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update CMS images" ON storage.objects FOR UPDATE USING (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete CMS images" ON storage.objects FOR DELETE USING (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_content_updated_at BEFORE UPDATE ON public.product_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
