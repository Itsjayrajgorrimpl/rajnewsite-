import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-machinery.jpg";

const HeavyMachinery = () => (
  <IndustryPageLayout
    seoTitle="Anti-Vibration & Molded Rubber for Industrial Machinery"
    seoDescription="Custom anti-vibration mounts and bonded rubber components for heavy machinery applications."
    heroImage={heroImage}
    heroImageAlt="Heavy industrial machinery with rubber anti-vibration mounts on factory floor"
    badge="HEAVY MACHINERY"
    title="Heavy Machinery &"
    titleAccent="Mechanical Equipment"
    intro="Mechanical systems operating under dynamic loads require vibration isolation and shock absorption to improve durability and reduce structural stress."
    components={[
      "Anti-vibration mounts",
      "Rubber-metal bonded bushings",
      "Shock isolation pads",
      "Custom molded dampers",
    ]}
    engineeringFocus={[
      "Load-bearing design",
      "Hardness optimization",
      "Bonding strength reliability",
      "Fatigue resistance",
    ]}
    ctaTitle="Looking for vibration control solutions?"
    ctaSubtitle="Request engineering consultation for your machinery isolation requirements."
    productLinks={[
      { label: "Anti-Vibration Mounts", to: "/anti-vibration-mounts" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Rubber-to-Metal Bonding Guide", to: "/guides/rubber-to-metal-bonding" },
      { label: "Material Selection Guide", to: "/guides/rubber-material-selection" },
    ]}
    url="/industries/heavy-machinery"
  />
);

export default HeavyMachinery;
