import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import ProductFAQ from "@/components/ProductFAQ";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createProductJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const materials = [
  ["NBR (Nitrile)", "Oil & fuel resistance", "-30°C to 120°C"],
  ["EPDM", "Steam & water resistance", "-40°C to 150°C"],
  ["Viton (FKM)", "Chemical & high-temp resistance", "-20°C to 200°C"],
  ["Silicone", "Food-grade & medical applications", "-60°C to 200°C"],
];

const hydraulicApps = ["Hydraulic power packs", "Directional control valves", "Cylinder gland sealing", "Fluid connector sealing", "Pump suction and discharge ports"];

const ORingsBondedSeals = () => (
  <Layout>
    <SEO
      title="Bonded Seal & O Ring Manufacturer India | Dowty Seals"
      description="NBR, EPDM, Viton O-rings and bonded seals for hydraulic and fluid systems. Custom OEM manufacturing and fast sampling support."
      jsonLd={createProductJsonLd({ name: "O-Rings & Bonded Seals", description: "NBR, EPDM, Viton O-rings and Dowty-type bonded seals for hydraulic and fluid systems.", url: "/o-rings-bonded-seals" })}
    />

    <PageHero
      badge="PRODUCT"
      title="O-Rings & Bonded Seal"
      titleAccent="Manufacturer"
      description="Standard and custom O-rings and Dowty-type bonded seals for high-pressure hydraulic and fluid systems."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeSection>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Range</p>
            <h2 className="mb-4 text-2xl font-bold">Standard & Custom Sizes</h2>
            <p className="text-muted-foreground">We manufacture O-rings in all standard AS568, ISO 3601, and Indian Standard sizes. Custom cross-sections and inner diameters available with rapid tooling.</p>
          </FadeSection>
          <FadeSection custom={1}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Performance</p>
            <h2 className="mb-4 text-2xl font-bold">Pressure Sealing</h2>
            <p className="text-muted-foreground">Bonded seals (Dowty-type) designed for high-pressure hydraulic connections up to 400 bar. Metal-rubber construction for BSP and metric port fittings.</p>
          </FadeSection>
        </div>
      </div>
    </section>

    <section className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Use Cases</p>
          <h2 className="mb-8 text-2xl font-bold">Hydraulic System Applications</h2>
        </FadeSection>
        <div className="grid gap-3 sm:grid-cols-2">
          {hydraulicApps.map((a, i) => (
            <FadeSection key={a} custom={i}>
              <div className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-premium">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{a}</span>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <FadeSection>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Materials</p>
          <h2 className="mb-8 text-2xl font-bold">Compatibility Guide</h2>
        </FadeSection>
        <FadeSection custom={1}>
          <div className="overflow-hidden rounded-2xl shadow-premium">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary"><TableHead className="font-semibold">Material</TableHead><TableHead className="font-semibold">Best For</TableHead><TableHead className="font-semibold">Temp Range</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {materials.map(([mat, use, temp]) => (<TableRow key={mat}><TableCell className="font-medium">{mat}</TableCell><TableCell>{use}</TableCell><TableCell>{temp}</TableCell></TableRow>))}
              </TableBody>
            </Table>
          </div>
        </FadeSection>
      </div>
    </section>

    <ProductFAQ
      title="O-Rings & Bonded Seals – Application FAQs"
      faqs={[
        { q: "How do I select the right O-ring material?", a: "Material selection depends on fluid compatibility, temperature exposure, and pressure requirements." },
        { q: "What is the difference between an O-ring and a bonded seal?", a: "O-rings provide elastic sealing in grooves, while bonded seals combine a metal washer with an elastomer sealing lip for high-pressure threaded connections." },
        { q: "Are bonded seals suitable for hydraulic systems?", a: "Yes. Bonded seals are commonly used in hydraulic fittings where pressure resistance and leak prevention are critical." },
        { q: "How is compression set relevant in O-ring applications?", a: "Excessive compression set can lead to leakage due to permanent deformation. Material choice influences long-term sealing performance." },
        { q: "Can custom sizes be developed?", a: "Yes. Custom O-ring cross-sections and bonded seal dimensions can be produced as per technical drawings." },
      ]}
      ctaLabel="Submit Sealing Requirement for Technical Review"
    />

    <PageCTA />
  </Layout>
);

export default ORingsBondedSeals;
