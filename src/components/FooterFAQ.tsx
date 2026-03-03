import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeSection } from "@/components/animations";

const faqs = [
  {
    q: "What types of rubber components does Raj Industries manufacture?",
    a: "Raj Industries manufactures industrial rubber diaphragms, anti-vibration mounts, O-rings, bonded seals, and custom molded rubber components designed for pressure systems, mechanical assemblies, and fluid handling applications.",
  },
  {
    q: "Do you supply standard parts or only custom components?",
    a: "We primarily support OEM manufacturers with custom-molded components based on technical drawings, samples, or application requirements. Standard sealing elements can also be supported where applicable.",
  },
  {
    q: "Which rubber materials do you work with?",
    a: "We process industrial elastomers including NBR, EPDM, Viton (FKM), Silicone, and other application-specific compounds selected based on temperature, oil resistance, and chemical compatibility requirements.",
  },
  {
    q: "Can you support rubber-to-metal bonded components?",
    a: "Yes. We manufacture rubber-to-metal bonded components for vibration isolation and sealing applications requiring structural integration.",
  },
  {
    q: "What industries do you serve?",
    a: "We support OEMs operating in fluid handling systems, hydraulic assemblies, mechanical equipment, chemical processing environments, and industrial infrastructure applications.",
  },
  {
    q: "Do you provide sampling before bulk production?",
    a: "Yes. Prototype samples can be developed after drawing review and tooling confirmation. Sampling timelines depend on component complexity.",
  },
  {
    q: "What information is required to request a quotation?",
    a: "To evaluate your requirement efficiently, please provide: technical drawing or sample, material preference (if known), application environment, estimated quantity, and required timeline. Our engineering team reviews submissions before issuing a quotation.",
  },
  {
    q: "How do you ensure dimensional accuracy?",
    a: "Components are produced under controlled molding processes with inspection checks aligned to drawing tolerances and customer specifications.",
  },
  {
    q: "Can you assist with material selection?",
    a: "Yes. Based on operating conditions such as pressure, temperature, and media exposure, we can recommend suitable elastomer options for evaluation.",
  },
  {
    q: "How quickly can you respond to an enquiry?",
    a: "All technical submissions are reviewed by our engineering team. Initial response is typically provided within one working day.",
  },
  {
    q: "Do you support small and medium batch requirements?",
    a: "Yes. We work with OEM production schedules and support both development volumes and ongoing supply requirements.",
  },
  {
    q: "Is technical information kept confidential?",
    a: "Yes. Drawings, specifications, and project-related information are handled with strict confidentiality.",
  },
];

const FooterFAQ = () => (
  <section className="bg-secondary py-24">
    <div className="container max-w-4xl">
      <FadeSection>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Technical clarifications for OEM manufacturers evaluating industrial rubber sealing and vibration components.
          </p>
        </div>
      </FadeSection>

      <FadeSection custom={1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border-none bg-background px-6 shadow-premium transition-shadow duration-300 data-[state=open]:shadow-premium-hover"
            >
              <AccordionTrigger className="py-5 text-left text-[15px] font-semibold hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeSection>

      {/* CTA */}
      <FadeSection custom={2}>
        <div className="mt-16 rounded-2xl bg-navy p-10 text-center md:p-14">
          <h3 className="mb-3 text-2xl font-bold text-navy-foreground md:text-3xl">
            Developing a sealing or vibration component for your system?
          </h3>
          <p className="mx-auto mb-8 max-w-lg text-navy-foreground/45">
            Submit your technical drawing for engineering review.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 rounded-full bg-primary px-10 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02]"
          >
            <Link to="/request-quote">
              Request Engineering Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeSection>
    </div>
  </section>
);

export default FooterFAQ;
