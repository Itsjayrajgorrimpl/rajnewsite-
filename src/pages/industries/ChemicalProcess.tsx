import IndustryPageLayout from "@/components/IndustryPageLayout";
import heroImage from "@/assets/industry-chemical.jpg";

const ChemicalProcess = () => (
  <IndustryPageLayout
    seoTitle="Chemical Resistant Rubber Sealing Components Manufacturer"
    seoDescription="EPDM, Viton and custom elastomer components for chemical and process industry applications."
    heroImage={heroImage}
    heroImageAlt="Chemical process plant with stainless steel pipelines and industrial valves"
    badge="CHEMICAL & PROCESS"
    title="Chemical &"
    titleAccent="Process Industries"
    intro="Process environments require elastomer components that withstand chemical exposure, temperature fluctuation, and pressure variation."
    components={[
      "Chemical-resistant diaphragms",
      "Viton sealing rings",
      "EPDM gaskets",
      "Custom molded process seals",
    ]}
    engineeringFocus={[
      "Media compatibility",
      "High temperature capability",
      "Controlled compound formulation",
      "Batch traceability",
    ]}
    ctaTitle="Require chemical-compatible sealing components?"
    ctaSubtitle="Submit your material requirement for evaluation."
    productLinks={[
      { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
      { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
      { label: "Custom Moulding", to: "/custom-moulding" },
    ]}
    guideLinks={[
      { label: "Rubber Material Selection Guide", to: "/guides/rubber-material-selection" },
      { label: "Compression Set in Sealing Systems", to: "/guides/compression-set" },
    ]}
    url="/industries/chemical-process"
  />
);

export default ChemicalProcess;
