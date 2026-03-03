import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Droplets, Gauge, Zap, Cog, FlaskConical, Building2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

interface IndustryCard {
  title: string;
  icon: LucideIcon;
  description: string;
  link: string;
}

const industries: IndustryCard[] = [
  {
    title: "Fluid Handling & Flow Control Systems",
    icon: Droplets,
    description: "Pressure sealing diaphragms, O-rings, bonded seals, and actuator sealing components for leak prevention under pressure cycling and temperature variation.",
    link: "/industries/fluid-handling",
  },
  {
    title: "Industrial Pumping & Dosing Equipment",
    icon: Gauge,
    description: "Fabric-reinforced diaphragms, chemical-resistant seals, and wear-resistant molded components for continuous reciprocating motion and media exposure.",
    link: "/industries/industrial-pumping",
  },
  {
    title: "Hydraulic & Pneumatic Systems",
    icon: Zap,
    description: "High-pressure O-rings, bonded sealing washers, and anti-vibration mounts engineered for compression resistance and oil compatibility.",
    link: "/industries/hydraulic-pneumatic",
  },
  {
    title: "Heavy Machinery & Mechanical Equipment",
    icon: Cog,
    description: "Anti-vibration rubber mounts, rubber-metal bonded bushings, and shock isolation components for load-bearing performance and vibration damping.",
    link: "/industries/heavy-machinery",
  },
  {
    title: "Chemical & Process Industries",
    icon: FlaskConical,
    description: "EPDM and Viton sealing elements, corrosion-resistant rubber components, and temperature-resistant diaphragms for chemical compatibility and sealing integrity.",
    link: "/industries/chemical-process",
  },
  {
    title: "Industrial Utility & Infrastructure Systems",
    icon: Building2,
    description: "Pipeline sealing gaskets, weatherproof seals, and anti-vibration mounts for water treatment, power generation, and municipal infrastructure operating under continuous duty cycles.",
    link: "/industries/utility-infrastructure",
  },
];

const Industries = () => (
  <Layout>
    <SEO
      title="Industries & Application Environments | Raj Industries"
      description="Engineered rubber sealing and vibration solutions for fluid handling, hydraulic systems, heavy machinery, chemical processing, and industrial infrastructure."
      jsonLd={createWebPageJsonLd({ name: "Industries & Application Environments We Serve", description: "Engineered rubber sealing and vibration solutions for demanding industrial operating conditions.", url: "/industries" })}
    />

    <PageHero
      badge="APPLICATION ENVIRONMENTS"
      title="Industries & Application Environments"
      titleAccent="We Serve"
      description="Raj Industries engineers custom rubber sealing and vibration control components for demanding industrial environments. Our solutions are designed for pressure systems, fluid handling equipment, mechanical assemblies, and process-driven applications requiring dimensional precision and material reliability."
    >
      <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02]">
        <Link to="/request-quote">Request Engineering Quote <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </PageHero>

    <section className="py-24">
      <div className="container max-w-5xl">
        <FadeSection>
          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            Below are key application sectors we support. Each environment presents unique engineering challenges — from chemical exposure and pressure cycling to vibration isolation and dimensional precision.
          </p>
        </FadeSection>

        <div className="space-y-6">
          {industries.map((ind, i) => (
            <FadeSection key={ind.title} custom={i}>
              <Link to={ind.link} className="group block">
                <div className="flex items-start gap-6 rounded-2xl p-8 shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                    <ind.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{ind.title}</h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{ind.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                      View Industry Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden gradient-cta py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="container relative text-center">
        <FadeSection>
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl">
            Developing a sealing or vibration component for your equipment?
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-primary-foreground/60">
            Submit your technical drawing for engineering review.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2 rounded-full px-10 shadow-elevated transition-all hover:shadow-glow hover:scale-[1.02]">
              <Link to="/request-quote">
                Request Engineering Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-primary-foreground/20 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/request-quote">Submit Drawing for Sampling</Link>
            </Button>
          </div>
        </FadeSection>
      </div>
    </section>
  </Layout>
);

export default Industries;
