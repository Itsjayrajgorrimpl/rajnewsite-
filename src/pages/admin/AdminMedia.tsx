import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Copy, Check } from "lucide-react";

interface MediaFile {
  id: string; file_name: string; file_path: string; mime_type: string | null;
  file_size: number | null; uploaded_at: string;
}

const AdminMedia = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const { data } = await supabase.from("media_files").select("*").order("uploaded_at", { ascending: false });
    setFiles((data as MediaFile[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 10 MB", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `media/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("cms-images").upload(path, file);
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("cms-images").getPublicUrl(path);
    await supabase.from("media_files").insert({
      file_name: file.name,
      file_path: urlData.publicUrl,
      mime_type: file.type,
      file_size: file.size,
    });
    toast({ title: "File uploaded" });
    setUploading(false);
    e.target.value = "";
    fetchFiles();
  };

  const handleDelete = async (f: MediaFile) => {
    if (!confirm(`Delete ${f.file_name}?`)) return;
    await supabase.from("media_files").delete().eq("id", f.id);
    toast({ title: "File deleted" });
    fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const isImage = (mime: string | null) => mime?.startsWith("image/");

  return (
    <AdminLayout title="Media Library">
      <div className="mb-6 flex items-center gap-4">
        <label className="cursor-pointer">
          <Button size="sm" className="gap-2 pointer-events-none" asChild><span><Plus className="h-4 w-4" /> Upload File</span></Button>
          <Input type="file" accept="image/*,.pdf,.svg" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
        {uploading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
        <span className="ml-auto text-sm text-muted-foreground">{files.length} file{files.length !== 1 ? "s" : ""}</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <div key={f.id} className="group overflow-hidden rounded-xl border bg-background shadow-sm">
              <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {isImage(f.mime_type) ? (
                  <img src={f.file_path} alt={f.file_name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-xs font-mono text-muted-foreground">{f.mime_type || "file"}</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate" title={f.file_name}>{f.file_name}</p>
                {f.file_size && <p className="text-xs text-muted-foreground">{(f.file_size / 1024).toFixed(0)} KB</p>}
                <div className="mt-2 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyUrl(f.file_path)}>
                    {copied === f.file_path ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(f)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMedia;
