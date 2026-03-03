import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Disc3, ShieldCheck, Pipette, Bolt, Factory, Gauge,
  Beaker, Timer, FileKey, Package, Ruler, ArrowRight,
  SearchCheck, PencilRuler, TruckIcon, ChevronRight,
  Droplets, Zap, Hammer, Wind, Cpu, Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import Layout from "@/components/Layout";
import { organizationJsonLd, createProductJsonLd } from "@/lib/jsonld";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

const products: { title: string; desc: string; icon: LucideIcon; link: string }[] = [
  {
    title: "Industrial Rubber Diaphragms",
    desc: "Custom molded diaphragms for pumps, valves & actuators. Fabric reinforced options available.",
    icon: Disc3,
    link: "/rubber-diaphragms",
  },
  {
    title: "Anti-Vibration Mounts",
    desc: "Engineered rubber-to-metal bonded mounts for machinery isolation and compressor applications.",
    icon: ShieldCheck,
    link: "/anti-vibration-mounts",
  },
  {
    title: "O-Rings",
    desc: "Standard and custom O-rings in NBR, EPDM, Viton and Silicone for hydraulic and pneumatic systems.",
    icon: Pipette,
    link: "/o-rings-bonded-seals",
  },
  {
    title: "Bonded Seals",
    desc: "Dowty-type bonded seals for high-pressure hydraulic connections with metal-rubber construction.",
    icon: Bolt,
    link: "/o-rings-bonded-seals",
  },
];

const stats = [
  { value: "15+", label: "Years of Engineering" },
  { value: "500+", label: "OEM Clients Served" },
  { value: "10K+", label: "On-Time Deliveries" },
  { value: "100+", label: "Team Members" },
];

const valueProps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Beaker, title: "Custom Compound Development", desc: "Proprietary formulations developed for extreme conditions" },
  { icon: Hammer, title: "In-House Tool Development", desc: "Complete tool design and development under one roof" },
  { icon: Timer, title: "Fast Prototype Sampling", desc: "7–10 day turnaround from drawing approval to samples" },
  { icon: Ruler, title: "Strict Tolerance Control", desc: "Dimensional accuracy with comprehensive inspection" },
  { icon: FileKey, title: "NDA & Confidentiality", desc: "Complete drawing and specification confidentiality" },
  { icon: Package, title: "Batch Flexibility", desc: "Small, medium and large batch production capability" },
];

const processSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  { num: "01", title: "Diagnose", desc: "Send your drawing or describe your failure mode. We diagnose like engineers.", icon: SearchCheck },
  { num: "02", title: "Engineer", desc: "Get a custom solution with engineering-level details. We work as partners.", icon: PencilRuler },
  { num: "03", title: "Deliver", desc: "Solutions move rapidly from production to your doorstep with full traceability.", icon: TruckIcon },
];

const industries: { name: string; icon: LucideIcon }[] = [
  { name: "Fluid Handling & Flow Control", icon: Droplets },
  { name: "Industrial Pumping & Dosing", icon: Gauge },
  { name: "Hydraulic & Pneumatic Systems", icon: Zap },
  { name: "Heavy Machinery & Equipment", icon: Cpu },
  { name: "Chemical & Process Industries", icon: Beaker },
  { name: "Industrial Utility Systems", icon: Hammer },
];

interface Banner {
  id: string; title: string; subtitle: string | null; cta_text: string | null;
  cta_link: string | null; image_url: string | null;
}

interface Testimonial {
  id: string; company_name: string; contact_name: string | null;
  quote: string | null; logo_url: string | null;
}

const Index = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [b, t] = await Promise.all([
        supabase.from("banners").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order"),
      ]);
      setBanners(b.data || []);
      setTestimonials(t.data || []);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO
        title="Industrial Rubber Parts Manufacturer India | Raj Industries"
        description="Custom molded rubber diaphragms, anti-vibration mounts, O-rings & bonded seals for OEM manufacturers. Engineering precision for pumps, valves & hydraulic systems."
        jsonLd={[organizationJsonLd, createProductJsonLd({ name: "Industrial Rubber Components", description: "Custom molded rubber diaphragms, anti-vibration mounts, O-rings & bonded seals for OEM manufacturers.", url: "/" })]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-32 text-navy-foreground md:py-44">
        {/* Patterns */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="pointer-events-none absolute inset-0 bg-noise" />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
        {/* Accent line */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2 text-xs font-medium tracking-wider text-navy-foreground/70 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              INDUSTRIAL SEALING SPECIALISTS
            </motion.span>
            <h1 className="mb-6 text-4xl font-bold leading-[1.08] md:text-7xl lg:text-8xl">
              Mission-Critical Sealing
              <br />
              Solutions — <span className="text-gradient-light">Delivered Fast</span>
            </h1>
            <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-navy-foreground/45">
              Custom Rubber Diaphragms, O-Rings & Bonded Seals Engineered for
              Pumps, Valves & Hydraulic Systems.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02]">
                <Link to="/request-quote">
                  Request Engineering Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 rounded-full border-navy-foreground/15 bg-navy-foreground/5 px-8 text-navy-foreground backdrop-blur-sm transition-all hover:border-navy-foreground/25 hover:bg-navy-foreground/10"
              >
                <Link to="/request-quote">Submit Drawing for Sampling</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              The Problem
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mb-6 text-3xl font-bold md:text-5xl"
            >
              Leaks. Downtime. Failed seals —{" "}
              <span className="text-gradient">We solve those problems</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Raj Industries designs and manufactures high-performance elastomer
              components that meet demanding mechanical and chemical
              specifications for OEM manufacturers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Products */}
      <section className="bg-secondary pb-28 pt-8">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Product Range
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-16 text-center text-3xl font-bold md:text-5xl">
              Core Products
            </motion.h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <Link to={p.link} className="group block h-full">
                  <div className="h-full rounded-2xl bg-background p-8 shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                      <p.icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{p.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                      Explore Product <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-navy py-24 text-navy-foreground">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="pointer-events-none absolute inset-0 bg-noise" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />
        <div className="container relative">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <p className="text-5xl font-bold text-gradient-light md:text-7xl">
                  {s.value}
                </p>
                <p className="mt-4 text-sm tracking-wide text-navy-foreground/40">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why OEMs Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-16 text-center text-3xl font-bold md:text-5xl">
              What Sets Us Apart
            </motion.h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl p-7 shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.03]" />
        <div className="pointer-events-none absolute inset-0 bg-noise" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Process
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-5 text-center text-3xl font-bold md:text-5xl">
              How We Fix It
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mb-16 max-w-2xl text-center text-navy-foreground/40">
              We solve customer issues by taking a truly customer-centric approach — staying proactive, transparent, and solution focused.
            </motion.p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-navy-light/80 bg-navy-light/40 p-9 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-navy-light/60"
              >
                <span className="absolute -right-2 -top-4 text-[90px] font-bold leading-none text-primary/[0.05] transition-all duration-500 group-hover:text-primary/[0.1]">
                  {step.num}
                </span>
                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-glow">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-foreground/40">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Application Environments
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-16 text-center text-3xl font-bold md:text-5xl">
              Industries We Support
            </motion.h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link to="/industries" className="group block">
                  <div className="rounded-2xl p-7 text-center shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                      <ind.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-bold">{ind.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-secondary py-28">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.p variants={fadeUp} custom={0} className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Trusted By OEMs
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mb-16 text-center text-3xl font-bold md:text-5xl">
                What Our Clients Say
              </motion.h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl bg-background p-8 shadow-premium"
                >
                  <Quote className="mb-4 h-8 w-8 text-primary/20" />
                  {t.quote && (
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">"{t.quote}"</p>
                  )}
                  <div className="flex items-center gap-3">
                    {t.logo_url && (
                      <img src={t.logo_url} alt={t.company_name} className="h-10 w-10 rounded-lg object-contain" />
                    )}
                    <div>
                      <p className="font-bold text-sm">{t.company_name}</p>
                      {t.contact_name && <p className="text-xs text-muted-foreground">{t.contact_name}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Banners */}
      {banners.length > 0 && (
        <section className="py-28">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {banners.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl bg-navy p-10 text-navy-foreground shadow-premium transition-all duration-500 hover:shadow-premium-hover"
                >
                  {b.image_url && (
                    <img src={b.image_url} alt={b.title} className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-105" />
                  )}
                  <div className="relative">
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">{b.title}</h3>
                    {b.subtitle && <p className="mb-6 text-sm text-navy-foreground/50">{b.subtitle}</p>}
                    {b.cta_text && b.cta_link && (
                      <Button asChild size="sm" className="gap-2 rounded-full">
                        <Link to={b.cta_link}>{b.cta_text} <ArrowRight className="h-3 w-3" /></Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <PageCTA />
    </Layout>
  );
};

export default Index;
