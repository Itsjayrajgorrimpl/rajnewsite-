import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { ArrowRight, Shapes, Flame, Ruler, Beaker, ShieldCheck, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";
import type { LucideIcon } from "lucide-react";

const capabilities: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Shapes, title: "Complex Geometries", text: "Custom molded parts in any shape — from simple gaskets to intricate multi-cavity components with tight tolerances." },
  { icon: Beaker, title: "Material Selection", text: "NBR, EPDM, Viton, Silicone, Neoprene, and Natural Rubber compounds tailored for your application requirements." },
  { icon: Flame, title: "High-Temperature Parts", text: "Specialized compounds rated up to 200°C for demanding thermal environments in industrial and automotive applications." },
  { icon: Ruler, title: "Precision Tolerances", text: "Dimensional accuracy as per customer drawings with inspection on every batch using calibrated instruments." },
  { icon: ShieldCheck, title: "Rubber-to-Metal Bonding", text: "Insert molding and rubber-to-metal bonded assemblies with pull-out tested adhesion for structural applications." },
  { icon: Timer, title: "Rapid Prototyping", text: "From drawing approval to prototype samples in 7–10 working days with in-house tooling and mold development." },
];

const CustomMoulding = () => (
  <Layout>
    <SEO
      title="Custom Rubber Moulding Manufacturer India | Raj Industries"
      description="Custom molded rubber components for OEM manufacturers. Complex geometries, precision tolerances, and rapid prototyping with in-house tooling."
      jsonLd={createWebPageJsonLd({ name: "Custom Rubber Moulding", description: "Custom molded rubber components for OEM manufacturers.", url: "/custom-moulding" })}
    />

    <PageHero
      badge="CAPABILITY"
      title="Custom Rubber"
      titleAccent="Moulding"
      description="Application-specific rubber components engineered and manufactured to your exact specifications — from concept to production."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-20">
      <div className="container max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <FadeSection key={c.title} custom={i}>
              <div className="group h-full rounded-2xl p-7 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <c.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-lg font-bold">{c.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    <PageCTA />
  </Layout>
);

export default CustomMoulding;
