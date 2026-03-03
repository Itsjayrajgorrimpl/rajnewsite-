import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-hydraulic.jpg";

const HydraulicPneumatic = () => (
  <IndustryPageLayout
    seoTitle="Hydraulic Rubber Seals & Bonded Components Manufacturer"
    seoDescription="High-pressure rubber O-rings, bonded seals, and vibration mounts for hydraulic and pneumatic systems."
    heroImage={heroImage}
    heroImageAlt="Hydraulic cylinders and pneumatic equipment in an industrial workshop"
    badge="HYDRAULIC & PNEUMATIC"
    title="Hydraulic &"
    titleAccent="Pneumatic Systems"
    intro="Hydraulic and pneumatic assemblies require reliable sealing under high pressure and oil exposure conditions."
    components={[
      "High-pressure O-rings",
      "Bonded seals (Dowty type)",
      "Anti-vibration mounts",
      "Custom molded hydraulic components",
    ]}
    engineeringFocus={[
      "Oil resistance (NBR/Viton)",
      "Compression set control",
      "Rubber-to-metal bonding",
      "Precision tolerance control",
    ]}
    ctaTitle="Discuss your hydraulic sealing requirement"
    ctaSubtitle="Our engineering team will review your specifications within 24 hours."
    productLinks={[
      { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
      { label: "Anti-Vibration Mounts", to: "/anti-vibration-mounts" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Rubber-to-Metal Bonding Guide", to: "/guides/rubber-to-metal-bonding" },
      { label: "Compression Set Explained", to: "/guides/compression-set" },
    ]}
    url="/industries/hydraulic-pneumatic"
  />
);

export default HydraulicPneumatic;
