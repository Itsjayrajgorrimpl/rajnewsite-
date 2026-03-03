import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsInjector = () => {
  const [settings, setSettings] = useState<{
    google_analytics_id: string | null;
    google_tag_manager_id: string | null;
    facebook_pixel_id: string | null;
  } | null>(null);

  useEffect(() => {
    supabase.from("seo_settings").select("google_analytics_id, google_tag_manager_id, facebook_pixel_id")
      .limit(1).maybeSingle()
      .then(({ data }) => {
        if (data) setSettings(data as any);
      });
  }, []);

  useEffect(() => {
    if (!settings) return;

    // Google Analytics
    if (settings.google_analytics_id) {
      const gaId = settings.google_analytics_id;
      if (!document.querySelector(`script[src*="${gaId}"]`)) {
        const s = document.createElement("script");
        s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        s.async = true;
        document.head.appendChild(s);

        const s2 = document.createElement("script");
        s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
        document.head.appendChild(s2);
      }
    }

    // Google Tag Manager
    if (settings.google_tag_manager_id) {
      const gtmId = settings.google_tag_manager_id;
      if (!document.querySelector(`script[src*="${gtmId}"]`)) {
        const s = document.createElement("script");
        s.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
        document.head.appendChild(s);
      }
    }

    // Facebook Pixel
    if (settings.facebook_pixel_id) {
      const fbId = settings.facebook_pixel_id;
      if (!document.querySelector(`script[data-fb-pixel]`)) {
        const s = document.createElement("script");
        s.setAttribute("data-fb-pixel", "true");
        s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbId}');fbq('track','PageView');`;
        document.head.appendChild(s);
      }
    }
  }, [settings]);

  return null;
};

export default AnalyticsInjector;
