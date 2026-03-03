import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import ProductFAQ from "@/components/ProductFAQ";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Hammer, Timer, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createProductJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const specs = [
  ["Material", "NBR / EPDM / Viton / Silicone"],
  ["Hardness", "30–80 Shore A"],
  ["Temperature Range", "-40°C to 200°C"],
  ["Reinforcement", "Nylon / Polyester Fabric"],
  ["Bonding", "Rubber-to-Metal Available"],
];

const applications = ["Dosing Pumps", "Air Operated Pumps", "Pressure Valves", "Actuators"];

const capabilities = [
  "Custom thickness control",
  "Fabric reinforcement integration",
  "Molded lip edge profiles",
  "Oil and chemical resistant compounds",
];

const RubberDiaphragms = () => (
  <Layout>
    <SEO
      title="Industrial Rubber Diaphragm Manufacturer India | Raj Industries"
      description="Custom molded rubber diaphragms for pumps and valves. Fabric reinforced, oil-resistant, OEM sampling support. Request engineering quote."
      jsonLd={createProductJsonLd({ name: "Industrial Rubber Diaphragms", description: "Custom molded rubber diaphragms for pumps, valves and hydraulic applications.", url: "/rubber-diaphragms" })}
    />

    <PageHero
      badge="PRODUCT"
      title="Industrial Rubber Diaphragm"
      titleAccent="Manufacturer"
      description="Custom molded rubber diaphragms for pump, valve, and hydraulic applications requiring pressure resistance and dimensional accuracy."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Specifications</p>
          <h2 className="mb-8 text-2xl font-bold">Technical Parameters</h2>
        </FadeSection>
        <FadeSection custom={1}>
          <div className="overflow-hidden rounded-2xl shadow-premium">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary">
                  <TableHead className="font-semibold">Parameter</TableHead>
                  <TableHead className="font-semibold">Specification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specs.map(([k, v]) => (
                  <TableRow key={k}><TableCell className="font-medium">{k}</TableCell><TableCell>{v}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </FadeSection>
      </div>
    </section>

    <section className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeSection>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Use Cases</p>
            <h2 className="mb-6 text-2xl font-bold">Applications</h2>
            <ul className="space-y-3">
              {applications.map((a) => (
                <li key={a} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 shrink-0 text-primary" /><span>{a}</span></li>
              ))}
            </ul>
          </FadeSection>
          <FadeSection custom={1}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Engineering</p>
            <h2 className="mb-6 text-2xl font-bold">Capabilities</h2>
            <ul className="space-y-3">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-3"><Hammer className="h-5 w-5 shrink-0 text-primary" /><span>{c}</span></li>
              ))}
            </ul>
          </FadeSection>
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <div className="flex items-start gap-5 rounded-2xl p-8 shadow-premium">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Timer className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-bold">Sampling & Tooling</h2>
              <p className="text-muted-foreground">Prototype development within 7–10 working days after drawing approval. Custom tool development with in-house CNC and EDM capabilities.</p>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>

    <ProductFAQ
      title="Rubber Diaphragm – Application FAQs"
      faqs={[
        { q: "What factors should be considered when selecting a rubber diaphragm?", a: "Key considerations include operating pressure, temperature range, media compatibility, frequency of movement, and expected service life. Material selection and reinforcement type must align with application conditions." },
        { q: "When is fabric reinforcement required in diaphragms?", a: "Fabric reinforcement is recommended in applications involving high pressure, repetitive flexing, or dimensional stability requirements to prevent deformation and extend service life." },
        { q: "Which materials are suitable for oil-based pump applications?", a: "NBR and Viton are commonly used for oil-resistant environments. Final selection depends on temperature and media composition." },
        { q: "What causes diaphragm failure in pump systems?", a: "Common causes include excessive pressure loading, improper material selection, high compression set, and chemical incompatibility." },
        { q: "Can diaphragms be developed as per custom drawings?", a: "Yes. Custom diaphragm development is supported based on technical drawings, thickness requirements, and reinforcement specifications." },
        { q: "How can I request diaphragm sampling?", a: "Submit your technical drawing along with application details. Our engineering team will review feasibility and respond accordingly." },
      ]}
      ctaLabel="Submit Drawing for Diaphragm Review"
    />

    <PageCTA />
  </Layout>
);

export default RubberDiaphragms;
