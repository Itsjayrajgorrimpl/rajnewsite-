import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import ProductFAQ from "@/components/ProductFAQ";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, CheckCircle, Magnet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createProductJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const specs = [
  ["Material", "Natural Rubber / NBR / Neoprene"],
  ["Hardness Range", "40–70 Shore A"],
  ["Load Capacity", "Custom engineered per application"],
  ["Bonding", "Rubber-to-Metal (Steel / SS / Aluminium)"],
  ["Temperature Range", "-30°C to 120°C"],
];

const applications = ["Compressor mounting systems", "Engine and motor isolation", "Industrial machinery bases", "HVAC equipment mounting", "Generator set isolation"];

const AntiVibrationMounts = () => (
  <Layout>
    <SEO
      title="Anti Vibration Mount Manufacturer India | OEM Rubber Components"
      description="Industrial anti-vibration rubber mounts for machinery and compressors. Custom designs available. Rubber-to-metal bonding capability."
      jsonLd={createProductJsonLd({ name: "Anti-Vibration Mounts", description: "Industrial anti-vibration rubber mounts for machinery and compressors with rubber-to-metal bonding.", url: "/anti-vibration-mounts" })}
    />

    <PageHero
      badge="PRODUCT"
      title="Anti-Vibration Mount"
      titleAccent="Manufacturer"
      description="Engineered rubber-to-metal bonded mounts designed to isolate machinery vibration, reduce noise transmission, and extend equipment life."
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
                <TableRow className="bg-secondary"><TableHead className="font-semibold">Parameter</TableHead><TableHead className="font-semibold">Specification</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {specs.map(([k, v]) => (<TableRow key={k}><TableCell className="font-medium">{k}</TableCell><TableCell>{v}</TableCell></TableRow>))}
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Performance</p>
            <h2 className="mb-4 text-2xl font-bold">Compression Characteristics</h2>
            <p className="text-muted-foreground">Each mount is engineered with specific compression-deflection characteristics to match the load, frequency, and amplitude requirements. Static and dynamic load testing available.</p>
          </FadeSection>
          <FadeSection custom={1}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Use Cases</p>
            <h2 className="mb-6 text-2xl font-bold">Applications</h2>
            <ul className="space-y-3">
              {applications.map((a) => (<li key={a} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 shrink-0 text-primary" /><span>{a}</span></li>))}
            </ul>
          </FadeSection>
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <div className="flex items-start gap-5 rounded-2xl p-8 shadow-premium">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Magnet className="h-6 w-6 text-primary" /></div>
            <div>
              <h2 className="mb-2 text-xl font-bold">Rubber-to-Metal Bonding</h2>
              <p className="text-muted-foreground">Our in-house bonding process ensures reliable adhesion between rubber and metal substrates using specialized primers and adhesives. Each bonded assembly undergoes pull-out and shear testing for quality assurance.</p>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>

    <ProductFAQ
      title="Anti-Vibration Mount – Application FAQs"
      faqs={[
        { q: "How is the correct anti-vibration mount selected?", a: "Selection depends on load weight, vibration frequency, mounting orientation, and environmental conditions." },
        { q: "What hardness is typically used for vibration isolation?", a: "Hardness selection depends on load-bearing requirements and isolation efficiency. Optimization balances stiffness and damping performance." },
        { q: "Can rubber-to-metal bonded mounts be customized?", a: "Yes. Bonded mounts can be developed according to dimensional and load specifications." },
        { q: "What industries typically require anti-vibration mounts?", a: "Applications include mechanical assemblies, industrial equipment, compressor units, and heavy machinery systems." },
        { q: "How do I share load specifications for evaluation?", a: "Provide equipment weight, mounting configuration, and vibration characteristics for engineering review." },
      ]}
      ctaLabel="Request Vibration Mount Evaluation"
    />

    <PageCTA />
  </Layout>
);

export default AntiVibrationMounts;
