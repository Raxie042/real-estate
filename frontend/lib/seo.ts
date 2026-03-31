/**
 * SEO Utilities for Meta Tags and Schema.org Markup
 */

export interface PropertySEOData {
  listingId: string;
  title: string;
  description: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  agentName?: string;
  agencyName?: string;
  yearBuilt?: number;
  propertyType: string;
  latitude?: number;
  longitude?: number;
  url: string;
}

/**
 * Generate meta tags object for property pages
 */
export const generatePropertyMetaTags = (data: PropertySEOData) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(data.price);

  const description = `${data.bedrooms}bd, ${data.bathrooms}ba home for ${formattedPrice} in ${data.address}. ${data.squareFeet.toLocaleString()} sqft. ${data.description}`.slice(0, 160);

  return {
    title: `${data.title} - ${formattedPrice} | Real Estate`,
    description,
    
    // Open Graph (Facebook, LinkedIn, etc.)
    'og:title': data.title,
    'og:description': description,
    'og:image': data.imageUrl,
    'og:type': 'website',
    'og:url': data.url,
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': description,
    'twitter:image': data.imageUrl,
    
    // Additional SEO
    'robots': 'index, follow',
    'canonical': data.url,
  };
};

/**
 * Generate Schema.org JSON-LD structured data for Property
 */
export const generatePropertySchema = (data: PropertySEOData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Property',
    name: data.title,
    description: data.description,
    image: data.imageUrl,
    url: data.url,
    
    // Property details
    numberOfRooms: data.bedrooms,
    numberOfBathroomsUnitComplete: data.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: data.squareFeet,
      unitCode: 'FT2',
    },
    
    // Price
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: 'USD',
      seller: {
        '@type': 'Agent',
        name: data.agentName || 'Real Estate Agent',
      },
    },
    
    // Location
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
    },
    
    // Geo coordinates (if available)
    ...(data.latitude && data.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude,
        longitude: data.longitude,
      },
    }),
    
    // Year built
    ...(data.yearBuilt && {
      yearBuilt: data.yearBuilt,
    }),
  };
};

/**
 * Generate Person schema for Agent
 */
export const generateAgentSchema = (agentData: {
  name: string;
  phone?: string;
  email?: string;
  image?: string;
  agency?: string;
  url?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agentData.name,
    telephone: agentData.phone,
    email: agentData.email,
    image: agentData.image,
    affiliation: {
      '@type': 'RealEstateOffice',
      name: agentData.agency,
    },
    url: agentData.url,
  };
};

/**
 * Set meta tags in document head
 */
export const setMetaTags = (tags: Record<string, string>) => {
  if (typeof document === 'undefined') return;

  Object.entries(tags).forEach(([key, value]) => {
    let element = document.querySelector(`meta[name="${key}"]`) ||
                  document.querySelector(`meta[property="${key}"]`);

    if (!element) {
      element = document.createElement('meta');
      if (key.startsWith('og:')) {
        element.setAttribute('property', key);
      } else {
        element.setAttribute('name', key);
      }
      document.head.appendChild(element);
    }

    element.setAttribute('content', value);
  });
};

/**
 * Set canonical URL
 */
export const setCanonicalUrl = (url: string) => {
  if (typeof document === 'undefined') return;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

/**
 * Inject structured data JSON-LD
 */
export const injectSchema = (schema: Record<string, any>, id = 'schema-json-ld') => {
  if (typeof document === 'undefined') return;

  let script = document.getElementById(id) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
};
