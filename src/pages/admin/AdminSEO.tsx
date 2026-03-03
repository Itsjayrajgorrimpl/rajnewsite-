import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const AdminSEO = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState({
    site_title: "",
    site_meta_description: "",
    google_analytics_id: "",
    google_tag_manager_id: "",
    facebook_pixel_id: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("seo_settings").select("*").limit(1).maybeSingle();
      if (data) {
        setId((data as any).id);
        setForm({
          site_title: (data as any).site_title || "",
          site_meta_description: (data as any).site_meta_description || "",
          google_analytics_id: (data as any).google_analytics_id || "",
          google_tag_manager_id: (data as any).google_tag_manager_id || "",
          facebook_pixel_id: (data as any).facebook_pixel_id || "",
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      site_title: form.site_title || null,
      site_meta_description: form.site_meta_description || null,
      google_analytics_id: form.google_analytics_id || null,
      google_tag_manager_id: form.google_tag_manager_id || null,
      facebook_pixel_id: form.facebook_pixel_id || null,
    };

    if (id) {
      const { error } = await supabase.from("seo_settings").update(payload).eq("id", id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "SEO settings saved" });
    } else {
      const { data, error } = await supabase.from("seo_settings").insert(payload).select().single();
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { setId((data as any).id); toast({ title: "SEO settings created" }); }
    }
    setSaving(false);
  };

  if (loading) return (
    <AdminLayout title="SEO & Analytics">
      <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="SEO & Analytics">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Global SEO</h2>
          <div className="space-y-2"><Label>Site Title</Label><Input value={form.site_title} onChange={(e) => setForm({ ...form, site_title: e.target.value })} maxLength={200} /></div>
          <div className="space-y-2"><Label>Site Meta Description</Label><Textarea value={form.site_meta_description} onChange={(e) => setForm({ ...form, site_meta_description: e.target.value })} rows={3} maxLength={500} /></div>
        </div>

        <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Google Integration</h2>
          <div className="space-y-2"><Label>Google Analytics ID <span className="text-xs text-muted-foreground">(e.g., G-XXXXXXXXXX)</span></Label><Input value={form.google_analytics_id} onChange={(e) => setForm({ ...form, google_analytics_id: e.target.value })} maxLength={50} /></div>
          <div className="space-y-2"><Label>Google Tag Manager ID <span className="text-xs text-muted-foreground">(e.g., GTM-XXXXXXX)</span></Label><Input value={form.google_tag_manager_id} onChange={(e) => setForm({ ...form, google_tag_manager_id: e.target.value })} maxLength={50} /></div>
        </div>

        <div className="rounded-xl border bg-background p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Facebook</h2>
          <div className="space-y-2"><Label>Facebook Pixel ID</Label><Input value={form.facebook_pixel_id} onChange={(e) => setForm({ ...form, facebook_pixel_id: e.target.value })} maxLength={50} /></div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save Settings</>}
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSEO;
