import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const productLinks = [
  { label: "Rubber Diaphragms", to: "/rubber-diaphragms" },
  { label: "Anti-Vibration Mounts", to: "/anti-vibration-mounts" },
  { label: "O-Rings & Bonded Seals", to: "/o-rings-bonded-seals" },
  { label: "Custom Moulding", to: "/custom-moulding" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Manufacturing", to: "/manufacturing-capability" },
  { label: "Industries", to: "/industries" },
  { label: "Resources", to: "/engineering-resources" },
  { label: "Quality", to: "/quality-certifications" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isProductPage = productLinks.some((l) => location.pathname === l.to);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-header shadow-header" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src={logo} alt="Raj Industries" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 md:h-14" />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-foreground md:text-lg">Raj Industries</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">India</span>
          </div>
        </Link>

        {/* Phone */}
        <a
          href="tel:+919821219739"
          className="ml-auto mr-4 hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-primary md:flex lg:mr-0"
        >
          <Phone className="h-3 w-3" />
          +91-9821219739
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {/* Home */}
          <Link
            to="/"
            className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
            {location.pathname === "/" && (
              <motion.span layoutId="nav-indicator" className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
            )}
          </Link>

          {/* Products dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors hover:text-primary ${
                isProductPage ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Products
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              {isProductPage && (
                <motion.span layoutId="nav-indicator" className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1.5 w-56 rounded-lg border border-border bg-popover p-1.5 shadow-lg"
                >
                  {productLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        location.pathname === link.to ? "text-primary bg-accent/50" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other nav links */}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.span layoutId="nav-indicator" className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
            </Link>
          ))}

          <Button asChild size="sm" className="ml-3 gap-1.5 rounded-full shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30">
            <Link to="/request-quote">
              Request a quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border glass-header px-4 pb-5 lg:hidden"
          >
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            {/* Mobile Products accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary ${
                  isProductPage ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-4"
                  >
                    {productLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                          location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (i + 2) * 0.04, duration: 0.3 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <a href="tel:+919821219739" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground">
              <Phone className="h-4 w-4" /> +91-9821219739
            </a>
            <Button asChild size="sm" className="mt-3 w-full gap-1.5 rounded-full">
              <Link to="/request-quote" onClick={() => setMobileOpen(false)}>
                Request a quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
