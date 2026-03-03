import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageCTAProps {
  title?: string;
  subtitle?: string;
}

const PageCTA = ({
  title = "Have a problem needing a fix?",
  subtitle = "Reach out to our engineering experts for a custom solution.",
}: PageCTAProps) => (
  <section className="relative overflow-hidden gradient-cta py-28">
    {/* Patterns */}
    <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
    <div className="pointer-events-none absolute inset-0 bg-noise" />
    <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-background/10 blur-[80px]" />
    <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-background/5 blur-[60px]" />

    <div className="container relative text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl">{title}</h2>
        <p className="mx-auto mb-12 max-w-xl text-lg text-primary-foreground/60">{subtitle}</p>
        <Button asChild size="lg" variant="secondary" className="gap-2 rounded-full px-10 shadow-elevated transition-all hover:shadow-glow hover:scale-[1.02]">
          <Link to="/request-quote">
            Talk to an Engineer <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PageCTA;
