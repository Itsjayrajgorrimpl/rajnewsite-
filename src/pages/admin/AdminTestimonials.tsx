import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Testimonial {
  id: string; company_name: string; contact_name: string | null;
  quote: string | null; logo_url: string | null; is_active: boolean; sort_order: number;
}

const empty = { company_name: "", contact_name: "", quote: "", sort_order: 0, is_active: true };

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(empty);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setLogoFile(null); setOpen(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ company_name: t.company_name, contact_name: t.contact_name || "", quote: t.quote || "", sort_order: t.sort_order, is_active: t.is_active });
    setLogoFile(null); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.company_name.trim()) return;
    setSaving(true);

    let logo_url = editing?.logo_url || null;
    if (logoFile) {
      const ext = logoFile.name.split(".").pop();
      const path = `logos/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("cms-images").upload(path, logoFile);
      if (!error) {
        const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
        logo_url = data.publicUrl;
      }
    }

    const payload = { ...form, logo_url };
    if (editing) {
      await supabase.from("testimonials").update(payload).eq("id", editing.id);
      toast({ title: "Testimonial updated" });
    } else {
      await supabase.from("testimonials").insert(payload);
      toast({ title: "Testimonial created" });
    }
    setSaving(false); setOpen(false); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Testimonial deleted" }); fetch();
  };

  return (
    <AdminLayout title="Testimonials & Clients">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} testimonial{items.length !== 1 ? "s" : ""}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Testimonial" : "New Testimonial"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Company Name *</Label><Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Contact Name</Label><Input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Quote / Testimonial</Label><Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} maxLength={1000} /></div>
              <div className="space-y-2"><Label>Company Logo</Label><Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} /></div>
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
                <TableHead>Company</TableHead><TableHead>Contact</TableHead><TableHead className="hidden md:table-cell">Quote</TableHead><TableHead>Active</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.company_name}</TableCell>
                  <TableCell className="text-sm">{t.contact_name || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs truncate">{t.quote || "—"}</TableCell>
                  <TableCell>{t.is_active ? "✓" : "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

export default AdminTestimonials;
