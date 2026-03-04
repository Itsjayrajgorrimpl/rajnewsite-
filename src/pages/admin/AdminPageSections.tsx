import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Section {
id: string;
title: string;
content: string;
icon: string;
sort_order: number;
page_slug: string; 
}

const AdminPageSections = () => {
const [sections, setSections] = useState<Section[]>([]);

const loadSections = async () => {
const { data } = await supabase
.from("page_sections")
.select("*")
.order("sort_order", { ascending: true });


if (data) setSections(data as Section[]);


};

useEffect(() => {
loadSections();
}, []);

const updateSection = async (id: string, field: string, value: string) => {
await supabase
.from("page_sections")
.update({ [field]: value })
.eq("id", id);


loadSections();


};

return ( <div className="container max-w-3xl py-10"> <h1 className="mb-6 text-2xl font-bold">Page Sections</h1>


  <div className="space-y-6">
    {sections.map((s) => (
      <div key={s.id} className="rounded-xl border p-6">
        <div className="space-y-4">
          <Input
            value={s.title}
            onChange={(e) =>
              updateSection(s.id, "title", e.target.value)
            }
          />

          <Textarea
            value={s.content}
            onChange={(e) =>
              updateSection(s.id, "content", e.target.value)
            }
          />

          <Input
            value={s.icon}
            onChange={(e) =>
              updateSection(s.id, "icon", e.target.value)
            }
          />

          <Input
            value={s.page_slug}
            onChange={(e) =>
              updateSection(s.id, "page_slug", e.target.value)
            }
          />
        </div>
      </div>
    ))}
  </div>
</div>


);
};

export default AdminPageSections;
