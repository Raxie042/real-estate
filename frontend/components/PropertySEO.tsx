'use client';

import { useEffect } from 'react';
import {
  PropertySEOData,
  generatePropertyMetaTags,
  generatePropertySchema,
  setMetaTags,
  setCanonicalUrl,
  injectSchema,
} from '@/lib/seo';

interface PropertySEOProps {
  data: PropertySEOData;
  children?: React.ReactNode;
}

/**
 * Applies SEO meta tags and structured data for property pages
 */
export const PropertySEO: React.FC<PropertySEOProps> = ({ data, children }) => {
  useEffect(() => {
    // Set meta tags
    const metaTags = generatePropertyMetaTags(data);
    setMetaTags(metaTags);

    // Set canonical URL
    setCanonicalUrl(data.url);

    // Inject Schema.org structured data
    const schema = generatePropertySchema(data);
    injectSchema(schema, `property-schema-${data.listingId}`);

    // Set page title
    if (typeof document !== 'undefined') {
      document.title = metaTags.title;
    }

    return () => {
      // Cleanup if needed
    };
  }, [data]);

  return <>{children}</>;
};

export default PropertySEO;
