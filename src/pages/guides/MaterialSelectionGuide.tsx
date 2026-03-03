import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const materialData = [
  { compound: "NBR (Nitrile)", oilResistance: "Excellent", tempRange: "-30 °C to +120 °C", chemCompat: "Petroleum oils, fuels, hydraulic fluids", hardness: "40–90 Shore A" },
  { compound: "EPDM", oilResistance: "Poor", tempRange: "-50 °C to +150 °C", chemCompat: "Steam, water, dilute acids, alkalis", hardness: "30–90 Shore A" },
  { compound: "FKM (Viton)", oilResistance: "Excellent", tempRange: "-20 °C to +200 °C", chemCompat: "Acids, fuels, solvents, hydraulic fluids", hardness: "55–90 Shore A" },
  { compound: "Silicone", oilResistance: "Fair", tempRange: "-60 °C to +230 °C", chemCompat: "Ozone, UV, dry heat, food-grade media", hardness: "20–80 Shore A" },
];

const mistakes = [
  "Using EPDM in petroleum-based hydraulic systems — zero oil resistance leads to rapid swelling and seal failure.",
  "Specifying standard NBR for steam applications — EPDM is the correct choice for hot water and steam environments.",
  "Over-specifying Viton when NBR would perform adequately — unnecessary cost increase without performance benefit.",
  "Ignoring compression set requirements — selecting material based on chemical compatibility alone without considering long-term deformation.",
  "Using silicone in dynamic high-pressure applications — silicone lacks the mechanical strength required for abrasion resistance.",
];

const MaterialSelectionGuide = () => (
  <Layout>
    <SEO
      title="NBR vs EPDM vs Viton | Industrial Rubber Material Guide"
      description="Technical guide to selecting the correct rubber compound for oil resistance, temperature range, and sealing performance in OEM systems."
      jsonLd={createWebPageJsonLd({ name: "Rubber Material Selection Guide", description: "Technical guide to selecting the correct rubber compound for industrial sealing applications.", url: "/guides/rubber-material-selection" })}
    />

    <PageHero
      badge="ENGINEERING GUIDE"
      title="Rubber Material Selection Guide"
      titleAccent="for Industrial Sealing"
      description="Technical insights on selecting the correct elastomer compound based on media exposure, temperature range, and mechanical requirements."
    />

    {/* Overview */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Elastomer Compound Overview</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Selecting the correct rubber compound is the foundation of seal reliability. Each elastomer family offers distinct performance characteristics across oil resistance, temperature tolerance, and chemical compatibility. The table below compares the four most commonly specified compounds in industrial sealing applications.
          </p>
        </FadeSection>

        <FadeSection custom={1}>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-4 text-left font-bold">Compound</th>
                  <th className="px-5 py-4 text-left font-bold">Oil Resistance</th>
                  <th className="px-5 py-4 text-left font-bold">Temperature Range</th>
                  <th className="px-5 py-4 text-left font-bold">Chemical Compatibility</th>
                  <th className="px-5 py-4 text-left font-bold">Hardness Range</th>
                </tr>
              </thead>
              <tbody>
                {materialData.map((m, i) => (
                  <tr key={m.compound} className={i < materialData.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-5 py-4 font-semibold">{m.compound}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.oilResistance}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.tempRange}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.chemCompat}</td>
                    <td className="px-5 py-4 text-muted-foreground">{m.hardness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeSection>
      </div>
    </section>

    {/* Temperature Resistance */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Temperature Resistance Comparison</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Operating temperature is a primary factor in elastomer selection. Exceeding a compound's rated temperature range accelerates ageing, increases compression set, and reduces sealing force.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {materialData.map((m) => (
              <div key={m.compound} className="rounded-2xl bg-background p-6 shadow-premium">
                <h3 className="mb-1 font-bold">{m.compound}</h3>
                <p className="text-lg font-semibold text-primary">{m.tempRange}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>

    {/* Hardness */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Shore A Hardness Selection</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Hardness (Shore A) directly affects sealing contact pressure and conformability. Selecting the appropriate durometer depends on groove geometry, surface finish, and operating pressure.
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-muted-foreground">
            <li><span className="font-semibold text-foreground">40–55 Shore A:</span> Low-pressure static seals requiring high conformability</li>
            <li><span className="font-semibold text-foreground">60–75 Shore A:</span> General-purpose sealing for <Link to="/o-rings-bonded-seals" className="text-primary hover:underline">O-rings</Link> and <Link to="/rubber-diaphragms" className="text-primary hover:underline">diaphragms</Link></li>
            <li><span className="font-semibold text-foreground">80–90 Shore A:</span> High-pressure applications requiring extrusion resistance</li>
          </ul>
        </FadeSection>
      </div>
    </section>

    {/* Common Mistakes */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Common Material Selection Mistakes in Pumps & Valves</h2>
          <div className="space-y-4">
            {mistakes.map((m, i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-background p-6 shadow-premium">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-sm font-bold text-destructive">{i + 1}</span>
                <p className="leading-relaxed text-muted-foreground">{m}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>

    {/* CTA */}
    <PageCTA
      title="Need compound recommendation for your application?"
      subtitle="Submit your drawing for engineering review. Our team will recommend the optimal elastomer for your operating conditions."
    />
  </Layout>
);

export default MaterialSelectionGuide;
