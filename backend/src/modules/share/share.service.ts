import { Injectable } from '@nestjs/common';

@Injectable()
export class ShareService {
  private readonly baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  generateShareUrl(
    listingId: string,
    platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'email',
  ): string {
    const listingUrl = `${this.baseUrl}/properties/${listingId}`;
    const encodedUrl = encodeURIComponent(listingUrl);

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}`;

      case 'whatsapp':
        return `https://wa.me/?text=${encodedUrl}`;

      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

      case 'email':
        return `mailto:?subject=Check out this property&body=${encodedUrl}`;

      default:
        return listingUrl;
    }
  }

  generateShareLinks(listingId: string, title: string, description: string) {
    const listingUrl = `${this.baseUrl}/properties/${listingId}`;
    const encodedUrl = encodeURIComponent(listingUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      copyLink: listingUrl,
    };
  }

  generateOpenGraphMetadata(listing: {
    id: string;
    title: string;
    description?: string;
    price: number;
    currency: string;
    images?: string[];
    address: string;
    city: string;
    state: string;
  }) {
    const url = `${this.baseUrl}/properties/${listing.id}`;
    const image = listing.images?.[0] || `${this.baseUrl}/default-property.jpg`;
    const description =
      listing.description ||
      `${listing.title} - ${listing.address}, ${listing.city}, ${listing.state}`;

    return {
      'og:title': listing.title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': 'website',
      'og:site_name': 'Luxury Real Estate',
      'twitter:card': 'summary_large_image',
      'twitter:title': listing.title,
      'twitter:description': description,
      'twitter:image': image,
    };
  }
}
