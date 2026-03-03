import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { FadeSection, PageHero } from "@/components/animations";
import { supabase } from "@/integrations/supabase/client";

const RequestQuote = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Upload drawing if provided
      let drawingUrl: string | null = null;
      const drawingFile = (form.elements.namedItem("drawing") as HTMLInputElement)?.files?.[0];

      if (drawingFile) {
        if (drawingFile.size > 10 * 1024 * 1024) {
          toast({ title: "File Too Large", description: "Drawing file must be under 10 MB.", variant: "destructive" });
          setLoading(false);
          return;
        }

        const fileExt = drawingFile.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("drawings")
          .upload(filePath, drawingFile);

        if (uploadError) throw uploadError;
        drawingUrl = filePath;
      }

      // Insert quote request
      const { error } = await supabase.from("quote_requests").insert({
        company: (formData.get("company") as string).trim(),
        contact_person: (formData.get("contact") as string).trim(),
        email: (formData.get("email") as string).trim(),
        phone: (formData.get("phone") as string).trim(),
        application_type: (formData.get("application") as string)?.trim() || null,
        material_required: (formData.get("material") as string)?.trim() || null,
        monthly_quantity: (formData.get("quantity") as string)?.trim() || null,
        drawing_url: drawingUrl,
        required_timeline: (formData.get("timeline") as string)?.trim() || null,
        notes: (formData.get("notes") as string)?.trim() || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Quote Request Received", description: "Our engineering team will review and respond within 24 hours." });
    } catch (err) {
      console.error("RFQ submission error:", err);
      toast({ title: "Submission Failed", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <SEO title="Quote Request Submitted | Raj Industries" description="Your engineering quote request has been submitted successfully." />
        <section className="py-28">
          <div className="container max-w-lg text-center">
            <FadeSection>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-3 text-2xl font-bold">Request Submitted</h1>
              <p className="text-muted-foreground">Your drawing has been received. Our engineering team will review and respond within 24 hours.</p>
            </FadeSection>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Request Engineering Quote | Raj Industries"
        description="Submit your drawing for technical review. Custom rubber diaphragms, O-rings, bonded seals & anti-vibration mounts. Response within 24 hours."
      />

      <PageHero
        badge="GET STARTED"
        title="Request"
        titleAccent="Engineering Quote"
        description="Submit your drawing for technical review — our engineering team responds within 24 hours."
      />

      <section className="py-16">
        <div className="container max-w-2xl">
          <FadeSection>
            <div className="rounded-2xl bg-background p-8 shadow-premium md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="company">Company Name *</Label><Input id="company" name="company" required maxLength={200} className="rounded-lg" /></div>
                  <div className="space-y-2"><Label htmlFor="contact">Contact Person *</Label><Input id="contact" name="contact" required maxLength={200} className="rounded-lg" /></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required maxLength={255} className="rounded-lg" /></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" type="tel" required maxLength={30} className="rounded-lg" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="application">Application Type</Label><Input id="application" name="application" placeholder="e.g., Dosing Pump Diaphragm" maxLength={300} className="rounded-lg" /></div>
                <div className="space-y-2"><Label htmlFor="material">Material Required</Label><Input id="material" name="material" placeholder="e.g., NBR 70 Shore A" maxLength={300} className="rounded-lg" /></div>
                <div className="space-y-2"><Label htmlFor="quantity">Monthly Quantity</Label><Input id="quantity" name="quantity" placeholder="e.g., 500 pieces/month" maxLength={200} className="rounded-lg" /></div>
                <div className="space-y-2"><Label htmlFor="drawing">Drawing Upload <span className="text-xs text-muted-foreground">(max 10 MB)</span></Label><Input id="drawing" name="drawing" type="file" accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.png" className="rounded-lg" /></div>
                <div className="space-y-2"><Label htmlFor="timeline">Required Timeline</Label><Input id="timeline" name="timeline" placeholder="e.g., Sampling within 2 weeks" maxLength={300} className="rounded-lg" /></div>
                <div className="space-y-2"><Label htmlFor="notes">Additional Notes</Label><Textarea id="notes" name="notes" rows={4} maxLength={2000} className="rounded-lg" /></div>
                <Button type="submit" size="lg" disabled={loading} className="w-full gap-2 rounded-full shadow-lg shadow-primary/25">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Quote Request <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </form>
            </div>
          </FadeSection>
        </div>
      </section>
    </Layout>
  );
};

export default RequestQuote;
