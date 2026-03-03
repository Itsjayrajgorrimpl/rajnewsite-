import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Gauge, Hammer, Magnet, Beaker, SearchCheck, Microscope, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const sections: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Gauge, title: "Compression Molding", text: "High-tonnage hydraulic presses for molding rubber parts with precise cavity fill, consistent cure cycles, and minimal flash." },
  { icon: Microscope, title: "Transfer Molding", text: "Transfer molding for complex geometries, insert-molded parts, and components requiring superior dimensional accuracy." },
  { icon: Magnet, title: "Rubber-to-Metal Bonding", text: "In-house surface preparation, primer application, and bonding process. Pull-out and shear testing for each batch." },
  { icon: Hammer, title: "Tool Room & Mold Development", text: "Dedicated tool room with CNC and EDM capabilities. Rapid prototype tooling within 7–10 days." },
  { icon: Beaker, title: "In-House Compound Development", text: "Custom compound formulation for oil resistance, temperature resistance, chemical compatibility." },
  { icon: SearchCheck, title: "Inspection & Testing", text: "Hardness testers, profile projectors, dimensional gauges, compression set apparatus, and ageing ovens." },
];

const ManufacturingCapability = () => (
  <Layout>
    <SEO
      title="Rubber Manufacturing Capability | Raj Industries"
      description="Compression molding, transfer molding, rubber-to-metal bonding, custom compound development. Industrial rubber manufacturing with strict tolerance control."
      jsonLd={createWebPageJsonLd({ name: "Manufacturing Capability", description: "Compression molding, transfer molding, rubber-to-metal bonding, custom compound development.", url: "/manufacturing-capability" })}
    />

    <PageHero
      badge="CAPABILITIES"
      title="Industrial Rubber Manufacturing"
      titleAccent="Capability"
      description="End-to-end manufacturing from compound development to final inspection, with strict dimensional tolerance control."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-20">
      <div className="container max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <FadeSection key={s.title} custom={i}>
              <div className="group h-full rounded-2xl p-7 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-lg font-bold">{s.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    <PageCTA />
  </Layout>
);

export default ManufacturingCapability;
