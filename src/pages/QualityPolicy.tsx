import { useEffect } from "react";

const QualityPolicy = () => {
  useEffect(() => {
    document.title = "Quality Policy - Raj Industries";
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { 
            padding: 40px 60px !important; 
            max-width: none !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Download bar */}
      <div className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background px-6 py-3">
        <button
          onClick={() => window.history.back()}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
        <button
          onClick={handleDownload}
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
        >
          Download PDF
        </button>
      </div>

      {/* Document */}
      <div className="flex min-h-screen justify-center bg-muted py-10 no-print-bg">
        <div className="print-page w-full max-w-[800px] rounded-xl border border-border bg-background px-16 py-14 shadow-premium" style={{ fontFamily: "'Inter', sans-serif" }}>
          
          {/* Header */}
          <div className="mb-10 flex flex-col items-center text-center">
            <img src={logo} alt="Raj Industries" className="mb-3 h-20 w-auto" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              RAJ INDUSTRIES
            </h1>
            <div className="mt-4 inline-block border-b-2 border-t-2 border-primary px-8 py-2">
              <span className="text-lg font-bold uppercase tracking-[0.3em] text-primary">
                Quality Policy
              </span>
            </div>
          </div>

          {/* Intro */}
          <p className="mb-8 text-sm leading-relaxed text-foreground/80">
            Raj Industries is committed to manufacturing and supplying high-precision industrial rubber components including rubber diaphragms, anti-vibration mounts, O-rings, bonded seals, and custom molded rubber parts for OEM manufacturers.
          </p>

          <p className="mb-8 text-sm font-semibold text-foreground">
            We are dedicated to achieving customer satisfaction through:
          </p>

          {/* Policy Points */}
          <div className="space-y-6">
            {[
              {
                num: "1",
                title: "Product Conformance",
                text: "Ensuring all products meet specified technical requirements, dimensional tolerances, and material performance standards as defined by customer drawings and applicable industry norms.",
              },
              {
                num: "2",
                title: "Process Control",
                text: "Implementing controlled manufacturing processes including compound development, molding, rubber-to-metal bonding, and final inspection to maintain consistency and repeatability.",
              },
              {
                num: "3",
                title: "Continuous Improvement",
                text: "Continuously improving our processes, tooling capability, and quality management systems to enhance performance, reduce defects, and increase operational efficiency.",
              },
              {
                num: "4",
                title: "Timely Delivery",
                text: "Maintaining efficient planning and production control to ensure on-time delivery aligned with OEM production schedules.",
              },
              {
                num: "5",
                title: "Compliance & Standards",
                text: "Complying with applicable statutory, regulatory, and customer-specific requirements related to product quality and safety.",
              },
              {
                num: "6",
                title: "Skilled Workforce",
                text: "Developing and training personnel to maintain technical competence in rubber processing, inspection, and quality assurance.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {item.num}
                </span>
                <div>
                  <h2 className="mb-1 text-sm font-bold text-foreground">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-foreground/70">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-12 border-t border-border pt-8">
            <p className="mb-8 text-sm leading-relaxed text-foreground/80">
              Raj Industries is committed to building long-term partnerships with OEM manufacturers by delivering reliable, consistent, and application-specific rubber solutions.
            </p>

            <div className="space-y-1 text-sm text-foreground">
              <p className="font-semibold">For Raj Industries</p>
              <div className="my-6 h-px w-48 border-b border-dashed border-foreground/30" />
              <p className="font-medium">Authorized Signatory</p>
              <p className="text-foreground/60">Date: ___________</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityPolicy;
