import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Inbox, MessageSquareQuote, PenSquare, Image, Layers, Factory, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ label, count, icon: Icon, to }: { label: string; count: number; icon: any; to: string }) => (
  <Link to={to} className="flex items-center gap-4 rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{count}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </Link>
);

const AdminOverview = () => {
  const [stats, setStats] = useState({ quotes: 0, banners: 0, testimonials: 0, posts: 0, pages: 0, industries: 0, products: 0, media: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [q, b, t, p, pg, ind, prod, m] = await Promise.all([
        supabase.from("quote_requests").select("id", { count: "exact", head: true }),
        supabase.from("banners").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("industries").select("id", { count: "exact", head: true }),
        supabase.from("product_content").select("id", { count: "exact", head: true }),
        supabase.from("media_files").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        quotes: q.count || 0, banners: b.count || 0, testimonials: t.count || 0,
        posts: p.count || 0, pages: pg.count || 0, industries: ind.count || 0,
        products: prod.count || 0, media: m.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Quote Requests" count={stats.quotes} icon={Inbox} to="/admin/quotes" />
        <StatCard label="Pages" count={stats.pages} icon={Layers} to="/admin/pages" />
        <StatCard label="Products" count={stats.products} icon={FileText} to="/admin/products" />
        <StatCard label="Industries" count={stats.industries} icon={Factory} to="/admin/industries" />
        <StatCard label="Blog Posts" count={stats.posts} icon={PenSquare} to="/admin/blog" />
        <StatCard label="Banners" count={stats.banners} icon={Image} to="/admin/banners" />
        <StatCard label="Testimonials" count={stats.testimonials} icon={MessageSquareQuote} to="/admin/testimonials" />
        <StatCard label="Media Files" count={stats.media} icon={Upload} to="/admin/media" />
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
