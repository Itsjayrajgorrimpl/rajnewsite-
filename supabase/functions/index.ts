import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const baseUrl = req.headers.get("origin") || "https://rajindustries.co.in";

  // Static pages
  const staticPages = [
    "/", "/rubber-diaphragms", "/anti-vibration-mounts", "/o-rings-bonded-seals",
    "/manufacturing-capability", "/industries", "/quality-certifications",
    "/request-quote", "/quality-policy", "/custom-moulding", "/engineering-resources",
    "/guides/rubber-material-selection", "/guides/compression-set",
    "/guides/rubber-to-metal-bonding", "/guides/diaphragm-design", "/blog",
    "/industries/fluid-handling", "/industries/industrial-pumping",
    "/industries/hydraulic-pneumatic", "/industries/heavy-machinery",
    "/industries/chemical-process", "/industries/utility-infrastructure",
  ];

  const urls: string[] = staticPages.map(
    (p) => `<url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`
  );

  // Published pages
  const { data: pages } = await supabase.from("pages").select("slug, updated_at").eq("status", "published");
  if (pages) {
    for (const p of pages) {
      urls.push(`<url><loc>${baseUrl}/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
    }
  }

  // Published products
  const { data: products } = await supabase.from("product_content").select("page_slug, updated_at").eq("status", "published");
  if (products) {
    for (const p of products) {
      urls.push(`<url><loc>${baseUrl}/${p.page_slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    }
  }

  // Published industries
  const { data: industries } = await supabase.from("industries").select("slug, updated_at").eq("status", "published");
  if (industries) {
    for (const p of industries) {
      urls.push(`<url><loc>${baseUrl}/industries/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
    }
  }

  // Published blog posts
  const { data: posts } = await supabase.from("blog_posts").select("slug, updated_at").eq("is_published", true);
  if (posts) {
    for (const p of posts) {
      urls.push(`<url><loc>${baseUrl}/blog/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, { headers: corsHeaders });
});
