import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, FileDown, Mail, Phone, Loader2, Inbox, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface QuoteRequest {
  id: string; company: string; contact_person: string; email: string; phone: string;
  application_type: string | null; material_required: string | null; monthly_quantity: string | null;
  drawing_url: string | null; required_timeline: string | null; notes: string | null;
  status: string; created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800", reviewing: "bg-yellow-100 text-yellow-800",
  quoted: "bg-green-100 text-green-800", closed: "bg-muted text-muted-foreground",
};

const AdminQuotes = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchQuotes = async () => {
    setLoading(true);
    let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data, error } = await query;
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchQuotes(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Updated", description: `Status changed to ${status}` }); fetchQuotes(); }
  };

  const downloadDrawing = async (path: string) => {
    const { data, error } = await supabase.storage.from("drawings").createSignedUrl(path, 300);
    if (error) toast({ title: "Error", description: "Could not generate download link.", variant: "destructive" });
    else if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const exportCSV = () => {
    const headers = ["Date", "Company", "Contact", "Email", "Phone", "Application", "Material", "Quantity", "Timeline", "Status", "Notes"];
    const rows = quotes.map(q => [
      format(new Date(q.created_at), "yyyy-MM-dd"),
      q.company, q.contact_person, q.email, q.phone,
      q.application_type || "", q.material_required || "", q.monthly_quantity || "",
      q.required_timeline || "", q.status, q.notes || "",
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-requests-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Quote Requests">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={fetchQuotes} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
        <span className="ml-auto text-sm text-muted-foreground">{quotes.length} request{quotes.length !== 1 ? "s" : ""}</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">No quote requests yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead><TableHead>Company</TableHead><TableHead>Contact</TableHead>
                <TableHead className="hidden md:table-cell">Application</TableHead>
                <TableHead className="hidden lg:table-cell">Material</TableHead>
                <TableHead>Drawing</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="whitespace-nowrap text-sm">{format(new Date(q.created_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="font-medium">{q.company}</TableCell>
                  <TableCell>
                    <div className="text-sm">{q.contact_person}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" /> {q.email}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {q.phone}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{q.application_type || "—"}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{q.material_required || "—"}</TableCell>
                  <TableCell>
                    {q.drawing_url ? (
                      <Button variant="ghost" size="sm" onClick={() => downloadDrawing(q.drawing_url!)} className="gap-1 text-primary">
                        <FileDown className="h-4 w-4" /> View
                      </Button>
                    ) : <span className="text-xs text-muted-foreground">None</span>}
                  </TableCell>
                  <TableCell>
                    <Select value={q.status} onValueChange={(v) => updateStatus(q.id, v)}>
                      <SelectTrigger className="h-8 w-28 border-0 p-0">
                        <Badge className={statusColors[q.status] || ""}>{q.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
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

export default AdminQuotes;
