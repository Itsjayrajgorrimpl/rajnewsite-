import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({ title, description, canonical, jsonLd }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
    {jsonLd && (
      <script type="application/ld+json">
        {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
      </script>
    )}
  </Helmet>
);

export default SEO;
