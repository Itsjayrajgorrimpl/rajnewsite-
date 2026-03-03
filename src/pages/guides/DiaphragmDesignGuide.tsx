import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Link } from "react-router-dom";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const designSections = [
  {
    title: "Pressure Loading Considerations",
    content: "Diaphragm design must account for both working pressure and pressure spikes. The effective diaphragm area, convolution depth, and wall thickness together determine maximum allowable pressure. Over-designing thickness to handle pressure without considering flex life reduces cycle performance. Under-designing results in rupture or permanent deformation.",
  },
  {
    title: "Fabric Reinforcement Selection",
    content: "Fabric-reinforced diaphragms use nylon, polyester, or aramid inserts to increase burst pressure and dimensional stability. The fabric type, weave pattern, and number of plies are determined by operating pressure, temperature, and required flex life. Single-ply nylon is standard for moderate-pressure dosing pumps. Multi-ply aramid is specified for high-pressure actuator applications.",
  },
  {
    title: "Thickness Optimisation",
    content: "Diaphragm thickness is a balance between pressure resistance and flexibility. Thicker diaphragms resist higher pressures but require greater actuation force and have reduced stroke. Thinner diaphragms provide better flow characteristics but are limited in pressure capacity. Finite element analysis is used to optimise the profile — varying thickness across the convolution to maximise both pressure rating and flex life.",
  },
];

const mediaTable = [
  { media: "Water / Glycol", compound: "EPDM", reason: "Excellent water and steam resistance" },
  { media: "Petroleum Oils", compound: "NBR", reason: "Oil resistance with cost efficiency" },
  { media: "Aggressive Chemicals", compound: "FKM (Viton)", reason: "Broad chemical resistance" },
  { media: "Food & Pharma", compound: "Silicone / EPDM", reason: "FDA-compliant, odourless" },
  { media: "High-Temperature Gases", compound: "FKM / Silicone", reason: "Thermal stability above 150 °C" },
];

const failureModes = [
  { mode: "Fatigue Cracking", desc: "Initiated at convolution apex due to cyclic stress concentration. Caused by insufficient radius or incorrect compound with poor fatigue resistance." },
  { mode: "Extrusion at Clamping Edge", desc: "Rubber squeezes out between flanges under excessive pressure or insufficient clamping force. Results in progressive seal loss." },
  { mode: "Chemical Attack", desc: "Media-incompatible compound swells, softens, or degrades. First signs appear as dimensional change before mechanical failure." },
  { mode: "Heat Ageing", desc: "Continuous high-temperature operation hardens the compound, increasing compression set at the clamping zone and reducing flex life." },
];

const DiaphragmDesignGuide = () => (
  <Layout>
    <SEO
      title="Industrial Rubber Diaphragm Design Guide for Pump & Valve OEMs"
      description="Engineering design principles for pressure-resistant and fabric-reinforced rubber diaphragms."
      jsonLd={createWebPageJsonLd({ name: "Diaphragm Design Guide", description: "Engineering design principles for industrial rubber diaphragms.", url: "/guides/diaphragm-design" })}
    />

    <PageHero
      badge="ENGINEERING GUIDE"
      title="Design Considerations for"
      titleAccent="Industrial Rubber Diaphragms"
      description="Engineering design principles covering pressure loading, fabric reinforcement, material selection, and failure analysis for pump and valve OEMs."
    />

    {/* Design Sections */}
    <section className="py-20">
      <div className="container max-w-4xl space-y-16">
        {designSections.map((s, i) => (
          <FadeSection key={s.title} custom={i}>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{s.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{s.content}</p>
          </FadeSection>
        ))}
      </div>
    </section>

    {/* Material Selection by Media */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Material Selection Based on Media</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            The process fluid determines compound selection. Refer to our <Link to="/guides/rubber-material-selection" className="text-primary hover:underline">material selection guide</Link> for detailed compound comparison.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-4 text-left font-bold">Process Media</th>
                  <th className="px-5 py-4 text-left font-bold">Recommended Compound</th>
                  <th className="px-5 py-4 text-left font-bold">Reason</th>
                </tr>
              </thead>
              <tbody>
                {mediaTable.map((m, i) => (
                  <tr key={m.media} className={i < mediaTable.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-5 py-4 font-semibold">{m.media}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.compound}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeSection>
      </div>
    </section>

    {/* Common Failure Modes */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Common Diaphragm Failure Modes</h2>
        </FadeSection>
        <div className="grid gap-5 sm:grid-cols-2">
          {failureModes.map((f, i) => (
            <FadeSection key={f.mode} custom={i}>
              <div className="h-full rounded-2xl p-7 shadow-premium">
                <h3 className="mb-2 font-bold text-destructive">{f.mode}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
        <FadeSection custom={4}>
          <p className="mt-8 text-muted-foreground">
            For detailed product specifications, visit our <Link to="/rubber-diaphragms" className="text-primary hover:underline">rubber diaphragms product page</Link>.
          </p>
        </FadeSection>
      </div>
    </section>

    <PageCTA
      title="Send your diaphragm drawing for feasibility review"
      subtitle="Our engineering team will assess your design and recommend material, reinforcement, and thickness optimisation."
    />
  </Layout>
);

export default DiaphragmDesignGuide;
