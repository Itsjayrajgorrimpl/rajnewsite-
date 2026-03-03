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

interface ProductFAQProps {
  title: string;
  faqs: { q: string; a: string }[];
  ctaLabel: string;
}

const ProductFAQ = ({ title, faqs, ctaLabel }: ProductFAQProps) => (
  <section className="py-24">
    <div className="container max-w-4xl">
      <FadeSection>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Technical FAQs
        </p>
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">{title}</h2>
      </FadeSection>

      <FadeSection custom={1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border-none bg-secondary px-6 shadow-premium transition-shadow duration-300 data-[state=open]:shadow-premium-hover"
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

      <FadeSection custom={2}>
        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="gap-2 rounded-full bg-primary px-10 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02]"
          >
            <Link to="/request-quote">
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeSection>
    </div>
  </section>
);

export default ProductFAQ;
