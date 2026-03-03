import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-fluid-handling.jpg";

const FluidHandling = () => (
  <IndustryPageLayout
    seoTitle="Rubber Sealing for Fluid Handling & Flow Control Systems"
    seoDescription="Custom diaphragms, O-rings and bonded seals engineered for fluid handling and flow control equipment."
    heroImage={heroImage}
    heroImageAlt="Industrial fluid handling and flow control system with stainless steel pipes and pressure gauges"
    badge="FLUID SYSTEMS"
    title="Fluid Handling &"
    titleAccent="Flow Control Systems"
    intro="Fluid handling systems operate under pressure cycling, temperature variation, and chemical exposure. Sealing reliability and dimensional accuracy are critical to preventing leakage and system failure."
    components={[
      "Pressure-resistant rubber diaphragms",
      "O-rings for static and dynamic sealing",
      "Bonded sealing washers",
      "Custom molded sealing rings",
    ]}
    engineeringFocus={[
      "Oil and chemical compatibility",
      "Fabric-reinforced diaphragm options",
      "Tight tolerance molding",
      "Long-term compression resistance",
    ]}
    applications={[
      "Dosing equipment",
      "Pressure regulation systems",
      "Control assemblies",
      "Mechanical flow units",
    ]}
    ctaTitle="Developing a sealing component for a fluid system?"
    ctaSubtitle="Submit your technical drawing for engineering review."
    productLinks={[
      { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
      { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Rubber Material Selection Guide", to: "/guides/rubber-material-selection" },
      { label: "Compression Set in Sealing Systems", to: "/guides/compression-set" },
    ]}
    url="/industries/fluid-handling"
  />
);

export default FluidHandling;
