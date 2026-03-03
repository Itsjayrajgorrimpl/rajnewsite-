import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-pumping.jpg";

const IndustrialPumping = () => (
  <IndustryPageLayout
    seoTitle="Rubber Diaphragms & Seals for Industrial Pumping Systems"
    seoDescription="Fabric reinforced diaphragms and oil-resistant sealing components for pumping and dosing equipment."
    heroImage={heroImage}
    heroImageAlt="Industrial pumping system with diaphragm pumps and piping"
    badge="PUMPING SYSTEMS"
    title="Industrial Pumping &"
    titleAccent="Dosing Equipment"
    intro="Industrial pumping systems demand elastomer components capable of handling repetitive motion, pressure loading, and chemical media exposure."
    components={[
      "Fabric reinforced diaphragms",
      "NBR & EPDM sealing elements",
      "Wear-resistant molded components",
      "Custom rubber valve seals",
    ]}
    engineeringFocus={[
      "Multi-layer diaphragm construction",
      "Chemical compatibility testing",
      "Mold customization",
      "Rapid sampling support",
    ]}
    ctaTitle="Need diaphragm development support?"
    ctaSubtitle="Upload your drawing for technical feasibility review."
    productLinks={[
      { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
      { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Diaphragm Design Guide", to: "/guides/diaphragm-design" },
      { label: "Rubber Material Selection Guide", to: "/guides/rubber-material-selection" },
    ]}
    url="/industries/industrial-pumping"
  />
);

export default IndustrialPumping;
