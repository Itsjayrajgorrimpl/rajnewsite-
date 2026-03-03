import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-utility.jpg";

const UtilityInfrastructure = () => (
  <IndustryPageLayout
    seoTitle="Rubber Sealing & Mounting Components for Utility Infrastructure"
    seoDescription="Custom rubber seals, gaskets and vibration mounts for water treatment, power generation, and industrial utility infrastructure systems."
    heroImage={heroImage}
    heroImageAlt="Industrial utility infrastructure with steel pipelines, valves and cooling towers"
    badge="UTILITY & INFRASTRUCTURE"
    title="Industrial Utility &"
    titleAccent="Infrastructure Systems"
    intro="Utility and infrastructure systems demand elastomer components engineered for continuous duty cycles, environmental exposure, and long service intervals. Sealing integrity and vibration isolation are critical to operational reliability across water, power, and municipal installations."
    components={[
      "Pipeline sealing gaskets and rings",
      "Valve stem seals and diaphragms",
      "Anti-vibration mounts for rotating equipment",
      "Custom molded weatherproof seals",
    ]}
    engineeringFocus={[
      "UV and ozone resistance for outdoor exposure",
      "Extended service life compound selection",
      "Water and steam compatibility",
      "Low-maintenance sealing design",
    ]}
    applications={[
      "Water treatment and distribution",
      "Power generation auxiliaries",
      "HVAC and cooling systems",
      "Municipal infrastructure equipment",
    ]}
    ctaTitle="Need sealing or mounting components for utility systems?"
    ctaSubtitle="Submit your specification for engineering review and sampling."
    productLinks={[
      { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
      { label: "Anti-Vibration Mounts", to: "/anti-vibration-mounts" },
      { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Rubber Material Selection Guide", to: "/guides/rubber-material-selection" },
      { label: "Rubber-to-Metal Bonding Guide", to: "/guides/rubber-to-metal-bonding" },
    ]}
    url="/industries/utility-infrastructure"
  />
);

export default UtilityInfrastructure;
