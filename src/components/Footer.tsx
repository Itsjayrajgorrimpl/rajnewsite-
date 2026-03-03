import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const productLinks = [
  { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
  { label: "Anti-Vibration Mounts", to: "/anti-vibration-mounts" },
  { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
  { label: "Custom Moulding", to: "/custom-moulding" },
];

const industryLinks = [
  { label: "Fluid Handling", to: "/industries/fluid-handling" },
  { label: "Industrial Pumping", to: "/industries/industrial-pumping" },
  { label: "Hydraulic & Pneumatic", to: "/industries/hydraulic-pneumatic" },
  { label: "Heavy Machinery", to: "/industries/heavy-machinery" },
  { label: "Chemical Process", to: "/industries/chemical-process" },
  { label: "Utility & Infrastructure", to: "/industries/utility-infrastructure" },
];

const companyLinks = [
  { label: "Manufacturing Capability", to: "/manufacturing-capability" },
  { label: "Quality & Certifications", to: "/quality-certifications" },
  { label: "Engineering Resources", to: "/engineering-resources" },
  { label: "Blog", to: "/blog" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />

      <div className="container relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <img src={logo} alt="Raj Industries" className="h-12 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold tracking-tight text-navy-foreground">Raj Industries</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-navy-foreground/40">India</span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-foreground/35">
              Precision-engineered industrial rubber sealing and anti-vibration components for OEM manufacturers.
            </p>
            <Link
              to="/request-quote"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/50 hover:bg-primary/15 hover:gap-3"
            >
              Request Engineering Quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy-foreground/25">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-foreground/45 transition-colors duration-200 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy-foreground/25">
              Industries
            </h3>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-foreground/45 transition-colors duration-200 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy-foreground/25">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-foreground/45 transition-colors duration-200 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy-foreground/25">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <a href="mailto:marketing@rajinds.com" className="flex items-center gap-2 text-navy-foreground/45 transition-colors hover:text-primary">
                <Mail className="h-3.5 w-3.5 shrink-0" /> marketing@rajinds.com
              </a>
              <a href="tel:+919821219739" className="flex items-center gap-2 text-navy-foreground/45 transition-colors hover:text-primary">
                <Phone className="h-3.5 w-3.5 shrink-0" /> +91-9821219739
              </a>
              <p className="flex items-center gap-2 text-navy-foreground/45">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-navy-light/50 pt-8 sm:flex-row">
          <p className="text-xs text-navy-foreground/20">
            © {new Date().getFullYear()} Raj Industries. All rights reserved.
          </p>
          <Link to="/quality-policy" className="text-xs text-navy-foreground/20 transition-colors hover:text-navy-foreground/40">
            Quality Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
