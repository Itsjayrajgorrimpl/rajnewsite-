import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Wrap a section to fade-in on scroll */
export const FadeSection = ({
  children,
  className,
  custom = 0,
}: {
  children: ReactNode;
  className?: string;
  custom?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    custom={custom}
    className={className}
  >
    {children}
  </motion.div>
);

/** Premium page hero with dark navy background */
export const PageHero = ({
  badge,
  title,
  titleAccent,
  description,
  children,
}: {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  children?: ReactNode;
}) => (
  <section className="relative overflow-hidden bg-navy py-24 text-navy-foreground md:py-36">
    {/* Grid pattern */}
    <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" />
    {/* Noise texture */}
    <div className="pointer-events-none absolute inset-0 bg-noise" />
    {/* Gradient orbs */}
    <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
    <div className="pointer-events-none absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />
    {/* Accent line */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium tracking-wider text-navy-foreground/70 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {badge}
        </motion.span>
        <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-[1.1] md:text-6xl">
          {title}{" "}
          <span className="text-gradient-light">{titleAccent}</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-navy-foreground/45">
          {description}
        </p>
        {children}
      </motion.div>
    </div>
  </section>
);
