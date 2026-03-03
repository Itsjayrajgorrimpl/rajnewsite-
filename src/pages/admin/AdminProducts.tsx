import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ProductContent {
  id: string; page_slug: string; page_title: string; meta_description: string | null;
  hero_title: string | null; hero_description: string | null; content: any;
  specifications: any; applications: any; faq: any;
  seo_title: string | null; seo_description: string | null;
  status: string; is_active: boolean; updated_at: string;
}

const empty = {
  page_slug: "", page_title: "", meta_description: "", hero_title: "", hero_description: "",
  specifications: "", applications: "", faq: "", seo_title: "", seo_description: "", status: "published",
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ProductContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductContent | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("product_content").select("*").order("page_title");
    setItems(data as ProductContent[] || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const toText = (v: any) => Array.isArray(v) ? v.map((item: any) => typeof item === "object" ? JSON.stringify(item) : item).join("\n") : "";

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: ProductContent) => {
    setEditing(p);
    setForm({
      page_slug: p.page_slug, page_title: p.page_title,
      meta_description: p.meta_description || "", hero_title: p.hero_title || "",
      hero_description: p.hero_description || "",
      specifications: toText(p.specifications), applications: toText(p.applications),
      faq: toText(p.faq), seo_title: p.seo_title || "", seo_description: p.seo_description || "",
      status: p.status || "published",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.page_slug.trim() || !form.page_title.trim()) return;
    setSaving(true);

    const toArr = (s: string) => s.split("\n").map(l => l.trim()).filter(Boolean);
    const payload = {
      page_slug: form.page_slug, page_title: form.page_title,
      meta_description: form.meta_description || null,
      hero_title: form.hero_title || null, hero_description: form.hero_description || null,
      specifications: toArr(form.specifications), applications: toArr(form.applications),
      faq: toArr(form.faq), seo_title: form.seo_title || null,
      seo_description: form.seo_description || null, status: form.status,
    };

    if (editing) {
      const { error } = await supabase.from("product_content").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Product updated" });
    } else {
      const { error } = await supabase.from("product_content").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Product created" });
    }
    setSaving(false); setOpen(false); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("product_content").delete().eq("id", id);
    toast({ title: "Product deleted" }); fetchItems();
  };

  return (
    <AdminLayout title="Product Content">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} product{items.length !== 1 ? "s" : ""}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit Product" : "New Product"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Page Slug * <span className="text-xs text-muted-foreground">(e.g., rubber-diaphragms)</span></Label><Input value={form.page_slug} onChange={(e) => setForm({ ...form, page_slug: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Page Title *</Label><Input value={form.page_title} onChange={(e) => setForm({ ...form, page_title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Hero Title</Label><Input value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Hero Description</Label><Textarea value={form.hero_description} onChange={(e) => setForm({ ...form, hero_description: e.target.value })} rows={3} maxLength={500} /></div>
              <div className="space-y-2"><Label>Specifications <span className="text-xs text-muted-foreground">(one per line)</span></Label><Textarea value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} rows={4} /></div>
              <div className="space-y-2"><Label>Applications <span className="text-xs text-muted-foreground">(one per line)</span></Label><Textarea value={form.applications} onChange={(e) => setForm({ ...form, applications: e.target.value })} rows={4} /></div>
              <div className="space-y-2"><Label>FAQ <span className="text-xs text-muted-foreground">(one per line)</span></Label><Textarea value={form.faq} onChange={(e) => setForm({ ...form, faq: e.target.value })} rows={4} /></div>
              <div className="space-y-2"><Label>SEO Title</Label><Input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>SEO Description</Label><Textarea value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} maxLength={300} /></div>
              <div className="space-y-2"><Label>Meta Description</Label><Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} maxLength={300} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.status === "published"} onCheckedChange={(v) => setForm({ ...form, status: v ? "published" : "draft" })} />
                <Label>Published</Label>
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead><TableHead>Slug</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.page_title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{p.page_slug}</TableCell>
                  <TableCell><Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                  <TableCell className="text-sm">{format(new Date(p.updated_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
