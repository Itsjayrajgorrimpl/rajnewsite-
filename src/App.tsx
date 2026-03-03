import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import RubberDiaphragms from "./pages/RubberDiaphragms";
import AntiVibrationMounts from "./pages/AntiVibrationMounts";
import ORingsBondedSeals from "./pages/ORingsBondedSeals";
import ManufacturingCapability from "./pages/ManufacturingCapability";
import Industries from "./pages/Industries";
import QualityCertifications from "./pages/QualityCertifications";
import RequestQuote from "./pages/RequestQuote";
import QualityPolicy from "./pages/QualityPolicy";
import CustomMoulding from "./pages/CustomMoulding";
import EngineeringResources from "./pages/EngineeringResources";
import MaterialSelectionGuide from "./pages/guides/MaterialSelectionGuide";
import CompressionSetGuide from "./pages/guides/CompressionSetGuide";
import RubberMetalBondingGuide from "./pages/guides/RubberMetalBondingGuide";
import DiaphragmDesignGuide from "./pages/guides/DiaphragmDesignGuide";
import FluidHandling from "./pages/industries/FluidHandling";
import IndustrialPumping from "./pages/industries/IndustrialPumping";
import HydraulicPneumatic from "./pages/industries/HydraulicPneumatic";
import HeavyMachinery from "./pages/industries/HeavyMachinery";
import ChemicalProcess from "./pages/industries/ChemicalProcess";
import UtilityInfrastructure from "./pages/industries/UtilityInfrastructure";
import BlogListing from "./pages/BlogListing";
import BlogPostPage from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminProducts from "./pages/admin/AdminProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rubber-diaphragms" element={<RubberDiaphragms />} />
              <Route path="/anti-vibration-mounts" element={<AntiVibrationMounts />} />
              <Route path="/o-rings-bonded-seals" element={<ORingsBondedSeals />} />
              <Route path="/manufacturing-capability" element={<ManufacturingCapability />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/fluid-handling" element={<FluidHandling />} />
              <Route path="/industries/industrial-pumping" element={<IndustrialPumping />} />
              <Route path="/industries/hydraulic-pneumatic" element={<HydraulicPneumatic />} />
              <Route path="/industries/heavy-machinery" element={<HeavyMachinery />} />
              <Route path="/industries/chemical-process" element={<ChemicalProcess />} />
              <Route path="/industries/utility-infrastructure" element={<UtilityInfrastructure />} />
              <Route path="/quality-certifications" element={<QualityCertifications />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="/quality-policy" element={<QualityPolicy />} />
              <Route path="/custom-moulding" element={<CustomMoulding />} />
              <Route path="/engineering-resources" element={<EngineeringResources />} />
              <Route path="/guides/rubber-material-selection" element={<MaterialSelectionGuide />} />
              <Route path="/guides/compression-set" element={<CompressionSetGuide />} />
              <Route path="/guides/rubber-to-metal-bonding" element={<RubberMetalBondingGuide />} />
              <Route path="/guides/diaphragm-design" element={<DiaphragmDesignGuide />} />
              <Route path="/blog" element={<BlogListing />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminOverview /></ProtectedRoute>} />
              <Route path="/admin/quotes" element={<ProtectedRoute><AdminQuotes /></ProtectedRoute>} />
              <Route path="/admin/banners" element={<ProtectedRoute><AdminBanners /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
