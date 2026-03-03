import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Banner {
  id: string; title: string; subtitle: string | null; cta_text: string | null;
  cta_link: string | null; image_url: string | null; sort_order: number;
  is_active: boolean; created_at: string;
}

const emptyBanner = { title: "", subtitle: "", cta_text: "", cta_link: "", sort_order: 0, is_active: true };

const AdminBanners = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(emptyBanner);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    const { data } = await supabase.from("banners").select("*").order("sort_order");
    setBanners(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyBanner); setImageFile(null); setOpen(true); };
  const openEdit = (b: Banner) => {
    setEditing(b);
    setForm({ title: b.title, subtitle: b.subtitle || "", cta_text: b.cta_text || "", cta_link: b.cta_link || "", sort_order: b.sort_order, is_active: b.is_active });
    setImageFile(null);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);

    let image_url = editing?.image_url || null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `banners/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("cms-images").upload(path, imageFile);
      if (error) { toast({ title: "Upload failed", variant: "destructive" }); setSaving(false); return; }
      const { data: urlData } = supabase.storage.from("cms-images").getPublicUrl(path);
      image_url = urlData.publicUrl;
    }

    const payload = { ...form, image_url };

    if (editing) {
      const { error } = await supabase.from("banners").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Banner updated" });
    } else {
      const { error } = await supabase.from("banners").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Banner created" });
    }

    setSaving(false);
    setOpen(false);
    fetchBanners();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    await supabase.from("banners").delete().eq("id", id);
    toast({ title: "Banner deleted" });
    fetchBanners();
  };

  return (
    <AdminLayout title="Banners & CTAs">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{banners.length} banner{banners.length !== 1 ? "s" : ""}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Banner</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Banner" : "New Banner"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Subtitle</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} maxLength={300} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CTA Text</Label><Input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} maxLength={100} /></div>
                <div className="space-y-2"><Label>CTA Link</Label><Input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} maxLength={300} /></div>
              </div>
              <div className="space-y-2"><Label>Image</Label><Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
                <div className="flex items-center gap-2 pt-6"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
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
                <TableHead>Title</TableHead><TableHead>CTA</TableHead><TableHead>Order</TableHead><TableHead>Active</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.cta_text || "—"}</TableCell>
                  <TableCell>{b.sort_order}</TableCell>
                  <TableCell>{b.is_active ? "✓" : "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(b)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

export default AdminBanners;
