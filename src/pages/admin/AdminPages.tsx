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
import { Plus, Pencil, Trash2, Loader2, Eye } from "lucide-react";
import { format } from "date-fns";

interface Page {
  id: string; title: string; slug: string; meta_title: string | null;
  meta_description: string | null; content: any; status: string;
  created_at: string; updated_at: string;
}

const empty = { title: "", slug: "", meta_title: "", meta_description: "", content: "", status: "draft" };

const AdminPages = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });
    setItems((data as Page[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Page) => {
    setEditing(p);
    setForm({
      title: p.title, slug: p.slug, meta_title: p.meta_title || "",
      meta_description: p.meta_description || "",
      content: typeof p.content === "string" ? p.content : JSON.stringify(p.content, null, 2),
      status: p.status,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const slug = form.slug || generateSlug(form.title);
    const payload = {
      title: form.title, slug,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      content: form.content,
      status: form.status,
    };

    if (editing) {
      const { error } = await supabase.from("pages").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Page updated" });
    } else {
      const { error } = await supabase.from("pages").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Page created" });
    }
    setSaving(false); setOpen(false); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await supabase.from("pages").delete().eq("id", id);
    toast({ title: "Page deleted" }); fetchItems();
  };

  return (
    <AdminLayout title="Pages">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} page{items.length !== 1 ? "s" : ""}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> New Page</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit Page" : "New Page"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} maxLength={300} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} maxLength={300} /></div>
              <div className="space-y-2"><Label>Meta Title</Label><Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} maxLength={200} /></div>
              <div className="space-y-2"><Label>Meta Description</Label><Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} maxLength={300} /></div>
              <div className="space-y-2"><Label>Content</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} /></div>
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

export default AdminPages;
