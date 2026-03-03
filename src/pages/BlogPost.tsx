import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { FadeSection } from "@/components/animations";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  cover_image_url: string | null; published_at: string | null; created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return (
    <Layout>
      <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </Layout>
  );

  if (!post) return (
    <Layout>
      <SEO title="Post Not Found | Raj Industries" description="The blog post you're looking for doesn't exist." />
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
        <p className="mt-2 text-muted-foreground">This article may have been removed or is not yet published.</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <SEO title={`${post.title} | Raj Industries`} description={post.excerpt || post.title} />
      <article className="py-16">
        <div className="container max-w-3xl">
          <FadeSection>
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt={post.title} className="mb-8 w-full rounded-2xl object-cover max-h-96" />
            )}
            <p className="mb-4 text-sm text-muted-foreground">
              {post.published_at ? format(new Date(post.published_at), "dd MMMM yyyy") : format(new Date(post.created_at), "dd MMMM yyyy")}
            </p>
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>
            <div className="prose prose-lg max-w-none text-foreground/90 whitespace-pre-wrap">
              {post.content}
            </div>
          </FadeSection>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
