'use client';

import { useState, useRef } from 'react';
import { FileDown, Loader2 } from 'lucide-react';

interface PropertyBrochureProps {
  listing: {
    title: string;
    price?: number | string;
    isPoa?: boolean;
    currency?: string;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number | string;
    propertyType?: string;
    listingType?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    description?: string;
    features?: string[];
    images?: string[];
    yearBuilt?: number;
    user?: { firstName?: string; lastName?: string; phone?: string; email?: string };
  };
}

export default function PropertyBrochure({ listing }: PropertyBrochureProps) {
  const [loading, setLoading] = useState(false);
  const brochureRef = useRef<HTMLDivElement>(null);

  const formatPrice = () => {
    if (listing.isPoa) return 'Price on Application';
    if (!listing.price) return '';
    const sym = listing.currency === 'GBP' ? '£' : listing.currency === 'EUR' ? '€' : listing.currency === 'AED' ? 'AED ' : '$';
    return `${sym}${Number(listing.price).toLocaleString()}`;
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Dynamically import to keep bundle small
      const jsPDF = (await import('jspdf')).default;

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = 210;
      const H = 297;

      // ── Background ──────────────────────────────────────────────
      pdf.setFillColor(246, 242, 236); // #F6F2EC
      pdf.rect(0, 0, W, H, 'F');

      // ── Dark header band ─────────────────────────────────────────
      pdf.setFillColor(28, 26, 23); // #1C1A17
      pdf.rect(0, 0, W, 52, 'F');

      // ── Gold accent line ─────────────────────────────────────────
      pdf.setDrawColor(201, 169, 106); // #C9A96A
      pdf.setLineWidth(0.5);
      pdf.line(15, 52, W - 15, 52);

      // ── Brand name ───────────────────────────────────────────────
      pdf.setTextColor(201, 169, 106);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('RAXIE PRIME', 15, 14);

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(listing.title, W - 30);
      pdf.text(titleLines, 15, 26);

      // ── Address ──────────────────────────────────────────────────
      const address = [listing.addressLine1, listing.city, listing.state].filter(Boolean).join(', ');
      if (address) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(200, 190, 175);
        pdf.text(address, 15, 44);
      }

      // ── Price badge ───────────────────────────────────────────────
      const price = formatPrice();
      if (price) {
        pdf.setFillColor(201, 169, 106);
        pdf.roundedRect(W - 65, 14, 50, 12, 2, 2, 'F');
        pdf.setTextColor(28, 26, 23);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(price, W - 40, 22, { align: 'center' });
      }

      // ── Hero image (first listing image) ─────────────────────────
      let yPos = 62;
      if (listing.images && listing.images[0]) {
        try {
          const img = await loadImageAsDataURL(listing.images[0]);
          if (img) {
            pdf.addImage(img, 'JPEG', 15, yPos, W - 30, 65);
            pdf.setDrawColor(201, 169, 106);
            pdf.setLineWidth(0.3);
            pdf.rect(15, yPos, W - 30, 65);
            yPos += 70;
          }
        } catch {
          yPos += 5;
        }
      }

      // ── Key stats row ─────────────────────────────────────────────
      yPos += 5;
      const stats = [
        listing.bedrooms ? `${listing.bedrooms} Bed` : null,
        listing.bathrooms ? `${listing.bathrooms} Bath` : null,
        listing.sqft ? `${Number(listing.sqft).toLocaleString()} sq ft` : null,
        listing.yearBuilt ? `Built ${listing.yearBuilt}` : null,
        listing.propertyType || null,
      ].filter(Boolean) as string[];

      if (stats.length) {
        const colW = (W - 30) / stats.length;
        stats.forEach((s, i) => {
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(15 + i * colW, yPos, colW - 2, 14, 1.5, 1.5, 'F');
          pdf.setDrawColor(232, 225, 215);
          pdf.setLineWidth(0.2);
          pdf.roundedRect(15 + i * colW, yPos, colW - 2, 14, 1.5, 1.5, 'D');
          pdf.setTextColor(28, 26, 23);
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'bold');
          pdf.text(s, 15 + i * colW + (colW - 2) / 2, yPos + 9, { align: 'center' });
        });
        yPos += 20;
      }

      // ── Description ───────────────────────────────────────────────
      if (listing.description) {
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(15, yPos, W - 30, 8, 1.5, 1.5, 'F');
        pdf.setTextColor(201, 169, 106);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.text('ABOUT THIS PROPERTY', 20, yPos + 5.5);
        yPos += 12;

        pdf.setTextColor(63, 54, 48);
        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(listing.description, W - 30);
        const maxDescLines = Math.min(descLines.length, 10);
        pdf.text(descLines.slice(0, maxDescLines), 15, yPos);
        yPos += maxDescLines * 4.5 + 8;
      }

      // ── Features grid ─────────────────────────────────────────────
      if (listing.features && listing.features.length > 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(15, yPos, W - 30, 8, 1.5, 1.5, 'F');
        pdf.setTextColor(201, 169, 106);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.text('KEY FEATURES', 20, yPos + 5.5);
        yPos += 12;

        const featureCols = 2;
        const featColW = (W - 30) / featureCols;
        listing.features.slice(0, 12).forEach((f, i) => {
          const col = i % featureCols;
          const row = Math.floor(i / featureCols);
          const fx = 15 + col * featColW;
          const fy = yPos + row * 6;
          pdf.setFillColor(201, 169, 106);
          pdf.circle(fx + 2, fy + 1.5, 1, 'F');
          pdf.setTextColor(63, 54, 48);
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.text(f, fx + 5, fy + 2.5);
        });
        yPos += Math.ceil(Math.min(listing.features.length, 12) / featureCols) * 6 + 8;
      }

      // ── Agent contact ─────────────────────────────────────────────
      if (listing.user) {
        const agentName = [listing.user.firstName, listing.user.lastName].filter(Boolean).join(' ');
        pdf.setFillColor(28, 26, 23);
        pdf.roundedRect(15, H - 35, W - 30, 22, 2, 2, 'F');
        pdf.setTextColor(201, 169, 106);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.text('YOUR AGENT', 20, H - 26);
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.text(agentName, 20, H - 20);
        if (listing.user.phone) {
          pdf.setFontSize(8);
          pdf.setTextColor(200, 190, 175);
          pdf.text(listing.user.phone, 20, H - 15);
        }
        if (listing.user.email) {
          pdf.setFontSize(8);
          pdf.setTextColor(200, 190, 175);
          pdf.text(listing.user.email, W / 2, H - 15);
        }
      }

      // ── Footer ────────────────────────────────────────────────────
      pdf.setTextColor(154, 139, 122);
      pdf.setFontSize(6.5);
      pdf.setFont('helvetica', 'normal');
      pdf.text('raxieprime.com  ·  +44 20 7123 4567  ·  enquiries@raxieprime.com', W / 2, H - 5, { align: 'center' });

      const fileName = `${listing.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-brochure.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Brochure generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="lux-button-outline inline-flex items-center gap-2 text-sm disabled:opacity-50"
    >
      {loading ? (
        <><Loader2 size={15} className="animate-spin" /> Generating…</>
      ) : (
        <><FileDown size={15} /> Download Brochure</>
      )}
    </button>
  );
}

// Helper: fetch an image URL and return a base64 data URL
async function loadImageAsDataURL(url: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('fetch failed');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
