import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Link } from "react-router-dom";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const processSteps = [
  { step: "01", title: "Metal Preparation", desc: "Degreasing, grit blasting, and phosphating to create a clean, roughened surface profile for adhesive keying." },
  { step: "02", title: "Primer Application", desc: "Application of chemically reactive primer coat to establish a chemical bond between the adhesive and the metal substrate." },
  { step: "03", title: "Adhesive Coating", desc: "Secondary adhesive layer application designed to bond with the specific rubber compound during vulcanisation." },
  { step: "04", title: "Moulding & Vulcanisation", desc: "Rubber compound is moulded directly onto the prepared metal insert under controlled temperature and pressure to cure both the rubber and the adhesive system simultaneously." },
  { step: "05", title: "Post-Cure & Inspection", desc: "Bond integrity verification through visual inspection and destructive tear testing per batch sampling protocols." },
];

const failures = [
  { cause: "Inadequate Surface Preparation", desc: "Oil, oxide, or moisture contamination prevents adhesive from keying to the metal surface. Bond failure occurs at the metal-primer interface." },
  { cause: "Incorrect Adhesive Selection", desc: "Adhesive system incompatible with the rubber compound or curing temperature. Results in cohesive failure within the adhesive layer." },
  { cause: "Under-Cure or Over-Cure", desc: "Incorrect moulding temperature or cycle time. Under-cure produces weak bonds; over-cure degrades the adhesive chemistry." },
  { cause: "Environmental Exposure", desc: "Prolonged exposure to aggressive chemicals, hydraulic fluids, or extreme temperatures degrades the bond interface over time." },
];

const RubberMetalBondingGuide = () => (
  <Layout>
    <SEO
      title="Rubber to Metal Bonding Process for Anti-Vibration & Sealing"
      description="Technical explanation of rubber-to-metal bonding methods used in industrial anti-vibration mounts and bonded seals."
      jsonLd={createWebPageJsonLd({ name: "Rubber-to-Metal Bonding Guide", description: "Technical explanation of rubber-to-metal bonding methods for industrial components.", url: "/guides/rubber-to-metal-bonding" })}
    />

    <PageHero
      badge="ENGINEERING GUIDE"
      title="Rubber-to-Metal Bonding"
      titleAccent="in Industrial Components"
      description="Technical overview of bonding processes, surface preparation, adhesive systems, and failure analysis for anti-vibration mounts and bonded seals."
    />

    {/* Overview */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Overview of the Bonding Process</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Rubber-to-metal bonding creates a permanent chemical and mechanical bond between an elastomer and a metal substrate. This process is essential for manufacturing <Link to="/anti-vibration-mounts" className="text-primary hover:underline">anti-vibration mounts</Link>, <Link to="/o-rings-bonded-seals" className="text-primary hover:underline">bonded seals</Link>, and other composite components where the rubber must remain permanently attached to the metal under mechanical stress, vibration, or fluid pressure.
          </p>
        </FadeSection>
      </div>
    </section>

    {/* Process Steps */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Manufacturing Process</h2>
        </FadeSection>
        <div className="space-y-4">
          {processSteps.map((s, i) => (
            <FadeSection key={s.step} custom={i}>
              <div className="flex gap-5 rounded-2xl bg-background p-7 shadow-premium">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{s.step}</span>
                <div>
                  <h3 className="mb-1 font-bold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    {/* Common Bonding Failures */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Common Bonding Failures</h2>
        </FadeSection>
        <div className="grid gap-5 sm:grid-cols-2">
          {failures.map((f, i) => (
            <FadeSection key={f.cause} custom={i}>
              <div className="h-full rounded-2xl p-7 shadow-premium">
                <h3 className="mb-2 font-bold text-destructive">{f.cause}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>

    {/* Applications */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Applications in Machinery & Hydraulics</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-background p-7 shadow-premium">
              <h3 className="mb-2 font-bold">Machinery & Compressors</h3>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                <li><Link to="/anti-vibration-mounts" className="text-primary hover:underline">Anti-vibration mounts</Link> for motor and compressor isolation</li>
                <li>Coupling elements and flexible connectors</li>
                <li>Rubber-metal bushings for rotating equipment</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-background p-7 shadow-premium">
              <h3 className="mb-2 font-bold">Hydraulic & Sealing</h3>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                <li><Link to="/o-rings-bonded-seals" className="text-primary hover:underline">Bonded seals (Dowty washers)</Link> for high-pressure connections</li>
                <li>Piston seals with metal backing rings</li>
                <li>Flange gaskets with integrated metal inserts</li>
              </ul>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>

    <PageCTA
      title="Looking for bonded rubber components?"
      subtitle="Request engineering consultation for your rubber-to-metal bonding requirements."
    />
  </Layout>
);

export default RubberMetalBondingGuide;
