import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const procedures = [
  { title: "Material Inspection", text: "Every incoming rubber compound batch is tested for hardness, specific gravity, and visual defects before release to production." },
  { title: "Dimensional Inspection", text: "Critical dimensions verified using calibrated instruments — profile projectors, micrometers, vernier calipers, and go/no-go gauges." },
  { title: "Batch Traceability", text: "Each production batch is assigned a unique lot number linked to raw material certificates, cure records, and inspection data." },
  { title: "Hardness Testing", text: "Shore A durometer testing on every batch per ASTM D2240 / IS 3400 standards." },
  { title: "Compression Set Testing", text: "Compression set values measured per ASTM D395 to validate long-term sealing performance of critical components." },
];

const QualityCertifications = () => (
  <Layout>
    <SEO
      title="Quality Assurance & Testing | Raj Industries"
      description="Strict quality control for industrial rubber parts. Batch traceability, hardness testing, compression set testing. Dimensional inspection on every lot."
      jsonLd={createWebPageJsonLd({ name: "Quality Assurance & Testing Standards", description: "Strict quality control for industrial rubber parts with batch traceability and testing.", url: "/quality-certifications" })}
    />

    <PageHero
      badge="QUALITY"
      title="Quality Assurance & Testing"
      titleAccent="Standards"
      description="Rigorous inspection procedures and testing standards to ensure every component meets OEM specifications."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-20">
      <div className="container max-w-4xl">
        <div className="space-y-5">
          {procedures.map((p, i) => (
            <FadeSection key={p.title} custom={i}>
              <div className="group flex items-start gap-5 rounded-2xl p-7 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="mb-1.5 text-lg font-bold">{p.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <div className="flex items-start gap-5 rounded-2xl bg-background p-8 shadow-premium">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-bold">Quality Policy Document</h2>
              <p className="mb-4 text-muted-foreground">Download our Quality Policy PDF for a detailed overview of our inspection procedures and standards compliance.</p>
              <Button asChild className="gap-2 rounded-full shadow-md shadow-primary/20">
                <Link to="/quality-policy">
                  <Download className="h-4 w-4" /> View Quality Policy
                </Link>
              </Button>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>

    <PageCTA />
  </Layout>
);

export default QualityCertifications;
