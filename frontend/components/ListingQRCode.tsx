'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCode, Download, Printer } from 'lucide-react';

interface ListingQRCodeProps {
  listingId: string;
  listingTitle?: string;
  size?: number;
}

// Lightweight QR code generator (no dependency) — encodes URL as a simple visual placeholder
// For production, swap the SVG for a proper qrcode library like 'qrcode' or 'react-qr-code'
function QRSvg({ url, size }: { url: string; size: number }) {
  // Generate a deterministic pattern from the URL for visual representation
  const cells = 25;
  const cellSize = size / cells;

  // Seed from url chars
  const seed = url.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const pattern: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      // Always fill finder patterns (corners)
      if ((r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7)) return true;
      // Timing patterns
      if (r === 6 || c === 6) return (r + c) % 2 === 0;
      // Data cells — deterministic from seed
      const hash = ((r * 31 + c) * 17 + seed * 7) % 100;
      return hash < 45;
    })
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1C1A17"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function ListingQRCode({ listingId, listingTitle, size = 180 }: ListingQRCodeProps) {
  const [mounted, setMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const url = mounted ? `${window.location.origin}/properties/${listingId}` : `https://raxiezenith.com/properties/${listingId}`;

  function handleDownload() {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const data = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `qr-${listingId}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function handlePrint() {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>QR Code — ${listingTitle || listingId}</title></head>
      <body style="display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif;">
        <h2 style="margin-bottom:8px;">${listingTitle || 'Property Listing'}</h2>
        <p style="color:#888;margin-bottom:24px;font-size:13px;">${url}</p>
        ${svgData}
        <p style="margin-top:16px;font-size:11px;color:#aaa;">Scan to view full listing details</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  }

  if (!mounted) return null;

  return (
    <div className="lux-card p-5 text-center">
      <div className="flex items-center gap-2 justify-center mb-4">
        <QrCode size={15} className="text-[#C9A96A]" />
        <span className="text-xs uppercase tracking-widest text-[#7A6E60]">Listing QR Code</span>
      </div>

      <div className="flex justify-center mb-3">
        <QRSvg url={url} size={size} />
      </div>

      <p className="text-xs text-[#9A8B7A] mb-4 break-all">{url}</p>

      <div className="flex gap-2 justify-center">
        <button onClick={handleDownload}
          className="flex items-center gap-1.5 text-xs border border-[#E8E1D7] rounded-lg px-3 py-2 text-[#5F5448] hover:border-[#C9A96A] transition">
          <Download size={12} /> Download SVG
        </button>
        <button onClick={handlePrint}
          className="flex items-center gap-1.5 text-xs border border-[#E8E1D7] rounded-lg px-3 py-2 text-[#5F5448] hover:border-[#C9A96A] transition">
          <Printer size={12} /> Print
        </button>
      </div>
    </div>
  );
}
