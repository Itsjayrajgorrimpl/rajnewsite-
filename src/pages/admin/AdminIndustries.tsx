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

interface Industry {
  id: string; title: string; slug: string; hero_image: string | null;
  description: string | null; components_supported: any; engineering_focus: any;
  seo_title: string | null; seo_description: string | null; status: string;
  created_at: string; updated_at: string;
}

const empty = {
  title: "", slug: "", description: "", components_supported: "",
  engineering_focus: "", seo_title: "", seo_description: "", status: "draft",
};

const AdminIndustries = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Industry | null>(null);
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("industries").select("*").order("title");
    setItems((data as Industry[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openNew = () => { setEditing(null); setForm(empty); setImageFile(null); setOpen(true); };
  const openEdit = (p: Industry) => {
    setEditing(p);
    const toText = (v: any) => Array.isArray(v) ? v.join("\n") : "";
    setForm({
      title: p.title, slug: p.slug, description: p.description || "",
      components_supported: toText(p.components_supported),
      engineering_focus: toText(p.engineering_focus),
      seo_title: p.seo_title || "", seo_description: p.seo_description || "",
      status: p.status,
    });
    setImageFile(null); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);

    let hero_image = editing?.hero_image || null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `industries/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("cms-images").upload(path, imageFile);
      if (!error) {
        const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
        hero_image = data.publicUrl;
      }
    }

    const toArr = (s: string) => s.split("\n").map(l => l.trim()).filter(Boolean);
    const slug = form.slug || generateSlug(form.title);
    const payload = {
      title: form.title, slug, hero_image, description: form.description || null,
      components_supported: toArr(form.components_supported),
      engineering_focus: toArr(form.engineering_focus),
      seo_title: form.seo_title || null, seo_description: form.seo_description || null,
      status: form.status,
    };

    if (editing) {
      const { error } = await supabase.from("industries").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Industry updated" });
    } else {
      const { error } = await supabase.from("industries").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Industry created" });
    }
    setSaving(false); setOpen(false); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this industry?")) return;
    await supabase.from("industries").delete().eq("id", id);
    toast({ title: "Industry deleted" }); fetchItems();
  };

  return (
    <AdminLayout title="Industries">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} industr{items.length !== 1 ? "ies" : "y"}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Industry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit Industry" : "New Industry"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} maxLength={300} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} maxLength={300} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} maxLength={2000} /></div>
              <div className="space-y-2"><Label>Hero Image</Label><Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /></div>
              <div className="space-y-2"><Label>Components Supported <span className="text-xs text-muted-foreground">(one per line)</span></Label><Textarea value={form.components_supported} onChange={(e) => setForm({ ...form, components_supported: e.target.value })} rows={4} /></div>
              <div className="space-y-2"><Label>Engineering Focus <span className="text-xs text-muted-foreground">(one per line)</span></Label><Textarea value={form.engineering_focus} onChange={(e) => setForm({ ...form, engineering_focus: e.target.value })} rows={4} /></div>
              <div className="space-y-2"><Label>SEO Title</Label><Input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>SEO Description</Label><Textarea value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} maxLength={300} /></div>
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
                <TableHead>Title</TableHead><TableHead>Slug</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{p.slug}</TableCell>
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

export default AdminIndustries;
