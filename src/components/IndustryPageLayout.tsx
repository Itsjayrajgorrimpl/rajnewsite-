import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeSection } from "@/components/animations";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { createWebPageJsonLd } from "@/lib/jsonld";

interface IndustryPageLayoutProps {
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroImageAlt: string;
  badge: string;
  title: string;
  titleAccent: string;
  intro: string;
  components: string[];
  engineeringFocus: string[];
  applications?: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  productLinks: { label: string; to: string }[];
  guideLinks?: { label: string; to: string }[];
  url: string;
}

const IndustryPageLayout = ({
  seoTitle,
  seoDescription,
  heroImage,
  heroImageAlt,
  badge,
  title,
  titleAccent,
  intro,
  components,
  engineeringFocus,
  applications,
  ctaTitle,
  ctaSubtitle,
  productLinks,
  guideLinks,
  url,
}: IndustryPageLayoutProps) => (
  <Layout>
    <SEO
      title={seoTitle}
      description={seoDescription}
      jsonLd={createWebPageJsonLd({ name: `${title} ${titleAccent}`, description: seoDescription, url })}
    />

    {/* Hero with Image */}
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />

      <div className="grid lg:grid-cols-2">
        {/* Text */}
        <div className="relative flex items-center py-20 md:py-28 lg:py-36">
          <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="container relative lg:pr-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium tracking-wider text-navy-foreground/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {badge}
              </span>
              <h1 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                {title}{" "}
                <span className="text-gradient-light">{titleAccent}</span>
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-navy-foreground/45">
                {intro}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02]">
                  <Link to="/request-quote">
                    Request Engineering Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-navy-foreground/15 bg-navy-foreground/5 px-8 text-navy-foreground backdrop-blur-sm transition-all hover:border-navy-foreground/25 hover:bg-navy-foreground/10">
                  <Link to="/request-quote">Submit Drawing for Sampling</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-transparent z-10" />
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Mobile image */}
      <div className="relative h-64 overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy z-10" />
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
    </section>

    {/* Components Supplied */}
    <section className="py-24">
      <div className="container max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeSection>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Components Supplied</h2>
            <div className="space-y-3">
              {components.map((comp) => (
                <div key={comp} className="flex items-start gap-3 rounded-xl p-4 shadow-premium transition-all duration-300 hover:shadow-premium-hover">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{comp}</p>
                </div>
              ))}
            </div>
          </FadeSection>

          <FadeSection custom={1}>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Engineering Focus</h2>
            <div className="space-y-3">
              {engineeringFocus.map((focus) => (
                <div key={focus} className="flex items-start gap-3 rounded-xl p-4 shadow-premium transition-all duration-300 hover:shadow-premium-hover">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{focus}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>
    </section>

    {/* Applications */}
    {applications && applications.length > 0 && (
      <section className="bg-secondary py-24">
        <div className="container max-w-5xl">
          <FadeSection>
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Applications</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {applications.map((app) => (
                <div key={app} className="rounded-2xl bg-background p-6 shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-0.5">
                  <p className="font-semibold">{app}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>
    )}

    {/* Related Products & Guides */}
    <section className={`py-24 ${applications && applications.length > 0 ? "" : "bg-secondary"}`}>
      <div className="container max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeSection>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Related Products</h2>
            <div className="space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between rounded-xl p-5 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5"
                >
                  <span className="font-semibold group-hover:text-primary transition-colors">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </FadeSection>

          {guideLinks && guideLinks.length > 0 && (
            <FadeSection custom={1}>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Engineering Guides</h2>
              <div className="space-y-3">
                {guideLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center justify-between rounded-xl p-5 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5"
                  >
                    <span className="font-semibold group-hover:text-primary transition-colors">{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </FadeSection>
          )}
        </div>
      </div>
    </section>

    {/* Response Commitment */}
    <section className="bg-navy py-12 text-navy-foreground">
      <div className="container">
        <FadeSection>
          <div className="flex items-center justify-center gap-3 text-sm text-navy-foreground/50">
            <Clock className="h-4 w-4 text-primary" />
            <span>Engineering review within 24 hours of drawing submission</span>
          </div>
        </FadeSection>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden gradient-cta py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-background/10 blur-[80px]" />
      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl">{ctaTitle}</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-primary-foreground/60">{ctaSubtitle}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2 rounded-full px-10 shadow-elevated transition-all hover:shadow-glow hover:scale-[1.02]">
              <Link to="/request-quote">
                Request Engineering Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-primary-foreground/20 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/request-quote">Submit Drawing for Sampling</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default IndustryPageLayout;
