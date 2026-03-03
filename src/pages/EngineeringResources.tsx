import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Gauge, Layers, PencilRuler } from "lucide-react";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const guides = [
  {
    title: "Rubber Material Selection Guide for Industrial Sealing Applications",
    desc: "NBR, EPDM, Viton, Silicone — oil resistance, temperature range, hardness selection, and common material mistakes in pump and valve applications.",
    icon: FlaskConical,
    link: "/guides/rubber-material-selection",
  },
  {
    title: "Understanding Rubber Compression Set in Sealing Systems",
    desc: "How permanent deformation impacts O-ring and diaphragm reliability, the effects of temperature and load, and testing standards overview.",
    icon: Gauge,
    link: "/guides/compression-set",
  },
  {
    title: "Rubber-to-Metal Bonding in Industrial Components",
    desc: "Bonding process, surface preparation, adhesive systems, common failures, and applications in anti-vibration mounts and bonded seals.",
    icon: Layers,
    link: "/guides/rubber-to-metal-bonding",
  },
  {
    title: "Design Considerations for Industrial Rubber Diaphragms",
    desc: "Pressure loading, fabric reinforcement, thickness optimisation, material selection by media, and common diaphragm failure modes.",
    icon: PencilRuler,
    link: "/guides/diaphragm-design",
  },
];

const EngineeringResources = () => (
  <Layout>
    <SEO
      title="Engineering Resources for OEM Manufacturers | Raj Industries"
      description="Technical guides on rubber sealing systems, diaphragm performance, vibration isolation, and material selection for industrial applications."
      jsonLd={createWebPageJsonLd({ name: "Engineering Resources", description: "Technical guides for OEM manufacturers on rubber sealing and vibration isolation.", url: "/engineering-resources" })}
    />

    <PageHero
      badge="TECHNICAL KNOWLEDGE"
      title="Engineering Resources"
      titleAccent="for OEM Manufacturers"
      description="Technical insights on rubber sealing systems, diaphragm performance, vibration isolation, and material selection for industrial applications."
    />

    <section className="py-20">
      <div className="container max-w-4xl">
        <div className="space-y-6">
          {guides.map((g, i) => (
            <FadeSection key={g.link} custom={i}>
              <Link to={g.link} className="group block">
                <div className="flex items-start gap-6 rounded-2xl p-8 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <g.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-lg font-bold group-hover:text-primary transition-colors">{g.title}</h2>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                      Read Guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    <PageCTA />
  </Layout>
);

export default EngineeringResources;
