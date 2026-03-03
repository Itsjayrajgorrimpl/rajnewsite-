import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { FadeSection, PageHero } from "@/components/animations";
import { ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string | null;
  cover_image_url: string | null; published_at: string | null; created_at: string;
}

const BlogListing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <SEO
        title="Technical Blog & Updates | Raj Industries"
        description="Technical articles, industry updates, and engineering insights from Raj Industries."
      />

      <PageHero
        badge="INSIGHTS"
        title="Technical"
        titleAccent="Blog & Updates"
        description="Engineering insights, industry news, and technical articles from our team."
      />

      <section className="py-16">
        <div className="container max-w-4xl">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : posts.length === 0 ? (
            <FadeSection>
              <p className="text-center text-lg text-muted-foreground">No articles published yet. Check back soon.</p>
            </FadeSection>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <FadeSection key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="group flex flex-col gap-4 rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center">
                    {post.cover_image_url && (
                      <img src={post.cover_image_url} alt={post.title} className="h-40 w-full rounded-xl object-cover md:h-32 md:w-48 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="mb-1 text-xs text-muted-foreground">
                        {post.published_at ? format(new Date(post.published_at), "dd MMM yyyy") : format(new Date(post.created_at), "dd MMM yyyy")}
                      </p>
                      <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </FadeSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogListing;
