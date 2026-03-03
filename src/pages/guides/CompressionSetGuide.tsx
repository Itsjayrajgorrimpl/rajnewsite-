import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import { Link } from "react-router-dom";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";

const sections = [
  {
    title: "What Is Compression Set?",
    content: "Compression set is the permanent deformation that remains in a rubber component after a compressive load is removed. Expressed as a percentage, it indicates how much of the original deflection is not recovered. A 0% compression set means full recovery; 100% means complete permanent deformation.",
  },
  {
    title: "Why Seals Fail Due to Permanent Deformation",
    content: "When an O-ring or diaphragm develops high compression set, it loses the ability to maintain contact pressure against the sealing surface. This results in reduced sealing force, gap formation between the seal and groove surfaces, progressive leakage that worsens over time, and eventual system failure requiring unplanned maintenance.",
  },
  {
    title: "Effect of Temperature & Load",
    content: "Compression set worsens significantly at elevated temperatures. Continuous exposure to temperatures near or above a compound's rated limit accelerates polymer chain degradation. Similarly, excessive squeeze percentage in groove design increases initial stress, which accelerates permanent deformation. Both factors compound — a seal operating at high temperature under excessive compression will fail prematurely.",
  },
];

const testStandards = [
  { standard: "ASTM D395", desc: "Standard test methods for rubber property — compression set. Method B (constant deflection) is most commonly referenced for sealing applications." },
  { standard: "ISO 815", desc: "Rubber, vulcanized or thermoplastic — determination of compression set at ambient, elevated, or low temperatures." },
  { standard: "DIN 53517", desc: "Testing of rubber — determination of compression set under constant strain." },
];

const CompressionSetGuide = () => (
  <Layout>
    <SEO
      title="Rubber Compression Set Explained for Pumps & Hydraulic Seals"
      description="Learn how compression set impacts sealing reliability and leakage in industrial rubber components."
      jsonLd={createWebPageJsonLd({ name: "Understanding Rubber Compression Set", description: "How compression set impacts sealing reliability in industrial rubber components.", url: "/guides/compression-set" })}
    />

    <PageHero
      badge="ENGINEERING GUIDE"
      title="Understanding Rubber Compression Set"
      titleAccent="in Sealing Systems"
      description="How permanent deformation affects seal reliability in O-rings, diaphragms, and gaskets used in pump and hydraulic applications."
    />

    {/* Main Sections */}
    <section className="py-20">
      <div className="container max-w-4xl space-y-16">
        {sections.map((s, i) => (
          <FadeSection key={s.title} custom={i}>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{s.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{s.content}</p>
          </FadeSection>
        ))}
      </div>
    </section>

    {/* Importance in Diaphragm & O-Ring Performance */}
    <section className="bg-secondary py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Importance in Diaphragm & O-Ring Performance</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-background p-7 shadow-premium">
              <h3 className="mb-3 font-bold">
                <Link to="/rubber-diaphragms" className="text-primary hover:underline">Rubber Diaphragms</Link>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Diaphragms undergo repeated flexing under pressure. High compression set in the clamping area reduces the seal between the diaphragm and housing, causing bypass leakage. Fabric reinforcement and correct compound selection are critical to controlling set in these applications.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-7 shadow-premium">
              <h3 className="mb-3 font-bold">
                <Link to="/o-rings-bonded-seals" className="text-primary hover:underline">O-Rings & Bonded Seals</Link>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O-rings in static applications rely on maintained compression to seal. Compression set above 40% typically indicates the seal is approaching end of useful life. In hydraulic systems, this leads to pressure loss and fluid bypass.
              </p>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>

    {/* Testing Standards */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <FadeSection>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Testing Standards Overview</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-4 text-left font-bold">Standard</th>
                  <th className="px-5 py-4 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {testStandards.map((t, i) => (
                  <tr key={t.standard} className={i < testStandards.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-5 py-4 font-semibold whitespace-nowrap">{t.standard}</td>
                    <td className="px-5 py-4 text-muted-foreground">{t.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeSection>
      </div>
    </section>

    <PageCTA
      title="Discuss your sealing performance requirement"
      subtitle="Our engineering team can help you specify compounds with optimal compression set resistance for your operating conditions."
    />
  </Layout>
);

export default CompressionSetGuide;
