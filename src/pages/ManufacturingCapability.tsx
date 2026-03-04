import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageCTA from "@/components/PageCTA";
import {
Gauge,
Hammer,
Magnet,
Beaker,
SearchCheck,
Microscope,
ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createWebPageJsonLd } from "@/lib/jsonld";
import { FadeSection, PageHero } from "@/components/animations";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
Gauge,
Hammer,
Magnet,
Beaker,
SearchCheck,
Microscope,
};

interface Section {
id: string;
title: string;
content: string;
icon: string;
sort_order: number;
}

const ManufacturingCapability = () => {
const [sections, setSections] = useState<Section[]>([]);

useEffect(() => {
const loadSections = async () => {
const { data } = await supabase
.from("page_sections")
.select("*")
.eq("page_slug", "manufacturing-capability")
.order("sort_order", { ascending: true });

```
  if (data) setSections(data as Section[]);
};

loadSections();
```

}, []);

return ( <Layout>
<SEO
title="Rubber Manufacturing Capability | Raj Industries"
description="Compression molding, transfer molding, rubber-to-metal bonding, custom compound development. Industrial rubber manufacturing with strict tolerance control."
jsonLd={createWebPageJsonLd({
name: "Manufacturing Capability",
description:
"Compression molding, transfer molding, rubber-to-metal bonding, custom compound development.",
url: "/manufacturing-capability",
})}
/>

```
  <PageHero
    badge="CAPABILITIES"
    title="Industrial Rubber Manufacturing"
    titleAccent="Capability"
    description="End-to-end manufacturing from compound development to final inspection, with strict dimensional tolerance control."
  >
    <Button
      asChild
      size="lg"
      className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25"
    >
      <Link to="/request-quote">
        Request Engineering Quote <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  </PageHero>

  <section className="py-20">
    <div className="container max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s, i) => {
          const Icon = iconMap[s.icon] || Gauge;

          return (
            <FadeSection key={s.id} custom={i}>
              <div className="group h-full rounded-2xl p-7 shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h2 className="mb-2 text-lg font-bold">{s.title}</h2>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.content}
                </p>
              </div>
            </FadeSection>
          );
        })}
      </div>
    </div>
  </section>

  <PageCTA />
</Layout>
```

);
};

export default ManufacturingCapability;
