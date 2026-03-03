import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  Inbox, LayoutDashboard, FileText, MessageSquareQuote, Image, PenSquare, LogOut, Menu, X,
  Globe, Factory, Layers, Search, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Quote Requests", path: "/admin/quotes", icon: Inbox },
  { label: "Pages", path: "/admin/pages", icon: Layers },
  { label: "Products", path: "/admin/products", icon: FileText },
  { label: "Industries", path: "/admin/industries", icon: Factory },
  { label: "Blog Posts", path: "/admin/blog", icon: PenSquare },
  { label: "Banners & CTAs", path: "/admin/banners", icon: Image },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Media Library", path: "/admin/media", icon: Upload },
  { label: "SEO & Analytics", path: "/admin/seo", icon: Search },
];

const AdminLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r bg-background transition-transform md:static md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link to="/admin" className="text-base font-bold text-foreground">Raj Industries</Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-3">
          <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground mb-1">
            <Globe className="h-4 w-4" /> View Site
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
