import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Pencil, Trash2, Loader2, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  cover_image_url: string | null; is_published: boolean; published_at: string | null;
  created_at: string; updated_at: string; category_id: string | null; meta_title: string | null;
}

interface BlogCategory {
  id: string; name: string; slug: string;
}

const empty = { title: "", slug: "", excerpt: "", content: "", is_published: false, category_id: "", meta_title: "" };

const AdminBlog = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(empty);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "" });

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("name");
    setCategories((data as BlogCategory[]) || []);
  };

  useEffect(() => { fetchPosts(); fetchCategories(); }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openNew = () => { setEditing(null); setForm(empty); setCoverFile(null); setOpen(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content,
      is_published: p.is_published, category_id: p.category_id || "", meta_title: p.meta_title || "",
    });
    setCoverFile(null); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);

    const slug = form.slug || generateSlug(form.title);
    let cover_image_url = editing?.cover_image_url || null;

    if (coverFile) {
      const ext = coverFile.name.split(".").pop();
      const path = `blog/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("cms-images").upload(path, coverFile);
      if (!error) {
        const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
        cover_image_url = data.publicUrl;
      }
    }

    const payload: any = {
      title: form.title, slug, excerpt: form.excerpt || null, content: form.content,
      cover_image_url, is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
      author_id: user?.id,
      category_id: form.category_id || null,
      meta_title: form.meta_title || null,
    };

    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Post updated" });
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Post created" });
    }
    setSaving(false); setOpen(false); fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Post deleted" }); fetchPosts();
  };

  const handleAddCategory = async () => {
    if (!newCat.name.trim()) return;
    const slug = newCat.slug || generateSlug(newCat.name);
    const { error } = await supabase.from("blog_categories").insert({ name: newCat.name, slug });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Category created" }); setNewCat({ name: "", slug: "" }); fetchCategories(); setCatOpen(false); }
  };

  const getCategoryName = (id: string | null) => categories.find(c => c.id === id)?.name || "—";

  return (
    <AdminLayout title="Blog Posts">
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <p className="text-sm text-muted-foreground">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        <div className="flex gap-2">
          <Dialog open={catOpen} onOpenChange={setCatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2"><Tag className="h-4 w-4" /> Categories</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Blog Categories</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {categories.map(c => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">/{c.slug}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <Label>New Category</Label>
                  <Input placeholder="Category name" value={newCat.name} onChange={(e) => setNewCat({ name: e.target.value, slug: generateSlug(e.target.value) })} />
                  <Button size="sm" onClick={handleAddCategory} className="w-full">Add Category</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} maxLength={300} /></div>
                <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} maxLength={300} /></div>
                <div className="space-y-2"><Label>Meta Title</Label><Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} maxLength={200} /></div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} maxLength={500} /></div>
                <div className="space-y-2"><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} /></div>
                <div className="space-y-2"><Label>Cover Image</Label><Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} /></div>
                <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} /><Label>Published</Label></div>
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{getCategoryName(p.category_id)}</TableCell>
                  <TableCell>
                    <Badge variant={p.is_published ? "default" : "secondary"}>
                      {p.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{format(new Date(p.created_at), "dd MMM yyyy")}</TableCell>
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

export default AdminBlog;
