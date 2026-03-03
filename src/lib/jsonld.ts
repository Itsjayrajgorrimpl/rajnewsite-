const BASE_URL = "https://www.rajindustries.co.in";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Raj Industries",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Industrial sealing & anti-vibration component manufacturer serving OEM manufacturers across India.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "marketing@rajinds.com",
    contactType: "sales",
  },
  sameAs: [],
};

export const createProductJsonLd = (product: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  url: `${BASE_URL}${product.url}`,
  manufacturer: {
    "@type": "Organization",
    name: "Raj Industries",
  },
  brand: {
    "@type": "Brand",
    name: "Raj Industries",
  },
});

export const createWebPageJsonLd = (page: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: page.name,
  description: page.description,
  url: `${BASE_URL}${page.url}`,
  publisher: {
    "@type": "Organization",
    name: "Raj Industries",
  },
});
