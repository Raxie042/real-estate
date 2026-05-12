'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Download, FileText, TrendingUp, Globe, Home, BarChart3, ChevronRight } from 'lucide-react';

const REPORTS = [
  {
    category: 'Global Market',
    icon: Globe,
    reports: [
      { title: 'Global Luxury Residential Report 2026', pages: 48, size: '4.2 MB', quarter: 'Q2 2026', description: 'An authoritative analysis of luxury residential markets across 25 countries, featuring price indices, transaction volumes and emerging trends.' },
      { title: 'World Cities Prime Index 2026', pages: 32, size: '2.8 MB', quarter: 'Q1 2026', description: 'Comparative performance of prime residential markets in the world\'s most sought-after cities.' },
      { title: 'International Investment Outlook', pages: 24, size: '2.1 MB', quarter: 'Q4 2025', description: 'Cross-border capital flows, yield comparisons and foreign investor activity across major real estate markets.' },
    ],
  },
  {
    category: 'Residential',
    icon: Home,
    reports: [
      { title: 'Prime Residential Market Report — Spring 2026', pages: 36, size: '3.5 MB', quarter: 'Q2 2026', description: 'Detailed review of ultra-prime residential performance, buyer sentiment and supply pipeline for the current season.' },
      { title: 'Luxury Apartment Trends 2026', pages: 28, size: '2.4 MB', quarter: 'Q1 2026', description: 'Emerging trends in high-end urban apartments — from wellness amenities to concierge services redefining city living.' },
      { title: 'Rural &amp; Country Estates Report', pages: 20, size: '1.8 MB', quarter: 'Q4 2025', description: 'Supply, demand and pricing analysis for country houses, farms and estate properties.' },
    ],
  },
  {
    category: 'Investment & Commercial',
    icon: BarChart3,
    reports: [
      { title: 'Real Estate Capital Markets 2026', pages: 40, size: '3.9 MB', quarter: 'Q2 2026', description: 'Institutional capital deployment, REIT performance and alternative real estate investment vehicles.' },
      { title: 'Build-to-Rent & BTL Market Review', pages: 22, size: '2.0 MB', quarter: 'Q1 2026', description: 'Rental market dynamics, yield analysis and landlord sentiment across the major geographies.' },
      { title: 'Sustainable & Green Buildings Index', pages: 18, size: '1.6 MB', quarter: 'Q4 2025', description: 'The financial premium commanded by certified sustainable properties and ESG-linked real estate.' },
    ],
  },
  {
    category: 'Market Insights',
    icon: TrendingUp,
    reports: [
      { title: 'Interest Rate Impact Study 2026', pages: 16, size: '1.4 MB', quarter: 'Q2 2026', description: 'How shifting central bank policy is reshaping buyer purchasing power and transaction activity.' },
      { title: 'Wealth Migration Report 2026', pages: 30, size: '2.7 MB', quarter: 'Q1 2026', description: 'Where ultra-high-net-worth individuals are relocating and the real estate markets benefiting most.' },
      { title: 'New Developments Pipeline — H1 2026', pages: 26, size: '2.3 MB', quarter: 'Q2 2026', description: 'Upcoming luxury and prime developments across key global cities, including launch timelines and pricing guidance.' },
    ],
  },
];

function ReportCard({ report, category }: { report: typeof REPORTS[0]['reports'][0]; category: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      // --- Dark header bar ---
      doc.setFillColor(28, 26, 23);
      doc.rect(0, 0, pageW, 48, 'F');

      // Gold accent line
      doc.setFillColor(201, 169, 106);
      doc.rect(0, 48, pageW, 0.8, 'F');

      // Company name
      doc.setTextColor(201, 169, 106);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('RAXIE ZENITH ESTATE', 18, 14);

      // Category + Quarter
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 135, 110);
      doc.setFontSize(8);
      doc.text(category.toUpperCase(), 18, 24);
      doc.text(report.quarter, pageW - 18, 24, { align: 'right' });

      // Report title (may wrap)
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(report.title, pageW - 36);
      doc.text(titleLines, 18, 38);

      // Gold vertical accent
      doc.setFillColor(201, 169, 106);
      doc.rect(18, 60, 0.8, 14, 'F');

      // Executive Summary heading
      doc.setTextColor(28, 26, 23);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 24, 68);

      // Description body
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 65, 50);
      const descLines = doc.splitTextToSize(report.description, pageW - 36);
      doc.text(descLines, 18, 80);

      // Metadata box
      const metaY = 108;
      doc.setFillColor(246, 242, 236);
      doc.roundedRect(18, metaY, pageW - 36, 28, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 26, 23);
      doc.text('REPORT DETAILS', 24, metaY + 8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(95, 80, 65);
      doc.text(`Category: ${category}`, 24, metaY + 16);
      doc.text(`Quarter: ${report.quarter}`, 24, metaY + 22);
      doc.text(`Pages: ${report.pages}    Size: ${report.size}`, pageW / 2, metaY + 16);

      // Contents
      const tocY = 148;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 26, 23);
      doc.text('Contents', 18, tocY);

      const sections = [
        ['1.  Market Overview & Key Findings', '3'],
        ['2.  Price Performance Analysis', '7'],
        ['3.  Transaction Volume Trends', '11'],
        ['4.  Buyer & Seller Sentiment', '15'],
        ['5.  Supply Pipeline', '19'],
        ['6.  Investment Outlook', '23'],
        ['7.  Geographic Hotspots', '27'],
        ['8.  Methodology & Data Sources', '31'],
      ];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 65, 50);
      sections.forEach(([title, pg], i) => {
        const y = tocY + 10 + i * 8;
        doc.text(title, 18, y);
        doc.setTextColor(180, 155, 105);
        doc.text(pg, pageW - 18, y, { align: 'right' });
        doc.setTextColor(80, 65, 50);
      });

      // Disclaimer box
      doc.setFillColor(255, 250, 240);
      doc.roundedRect(18, 232, pageW - 36, 18, 2, 2, 'F');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 105, 85);
      doc.text(
        'This report is produced by Raxie Zenith Estate for informational purposes only. The data and commentary',
        22, 238.5
      );
      doc.text(
        'contained herein are indicative and should not be relied upon for investment decisions without independent verification.',
        22, 244
      );

      // --- Footer ---
      doc.setFillColor(28, 26, 23);
      doc.rect(0, pageH - 18, pageW, 18, 'F');
      doc.setTextColor(150, 135, 110);
      doc.setFontSize(7.5);
      doc.text('Raxie Zenith Estate  ·  raxiezenithestate.com  ·  +44 20 7123 4567', 18, pageH - 9);
      doc.setTextColor(201, 169, 106);
      doc.text(`© 2026`, pageW - 18, pageH - 9, { align: 'right' });

      doc.save(`${report.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="lux-card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-medium text-[#1C1A17] leading-snug flex-1">{report.title}</h3>
        <span className="lux-badge shrink-0 text-[10px]">{report.quarter}</span>
      </div>
      <p className="text-sm text-[#7A6E60] leading-relaxed flex-1 mb-5">{report.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#9A8B7A] flex items-center gap-1">
          <FileText size={12} /> {report.pages} pages · {report.size}
        </span>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 text-sm font-medium text-[#C9A96A] hover:text-[#b8924a] transition disabled:opacity-50"
        >
          <Download size={14} />
          {downloading ? 'Preparing…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...REPORTS.map(r => r.category)];

  const filtered = activeCategory === 'All'
    ? REPORTS
    : REPORTS.filter(r => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554469384-e58fac937c6b?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            Knowledge Centre
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white lux-heading mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
          >
            Market Research &amp; Reports
          </motion.h1>
          <motion.div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.35 }} />
          <motion.p
            className="text-lg text-white/60 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Authoritative insight into the world&apos;s prime and luxury real estate markets — freely available to our clients and partners.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Category filter */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C9A96A] text-[#1C1A17]'
                    : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Report grids */}
        {filtered.map((group, gi) => (
          <ScrollReveal key={group.category} delay={gi * 0.08}>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <group.icon size={18} className="text-[#C9A96A]" />
                <h2 className="text-2xl font-light text-[#1C1A17] lux-heading">{group.category}</h2>
                <div className="flex-1 h-px bg-[#E8E1D7]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.reports.map((r, ri) => (
                  <ScrollReveal key={ri} delay={ri * 0.06}>
                    <ReportCard report={r} category={group.category} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-8 bg-[#1C1A17] rounded-2xl p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Bespoke Research</p>
            <h3 className="text-3xl font-light text-white lux-heading mb-4">Need a custom market analysis?</h3>
            <p className="text-white/50 font-light mb-7 max-w-xl mx-auto">Our research team prepares tailored reports for specific geographies, property types, or investment briefs.</p>
            <Link href="/contact" className="lux-button inline-flex items-center gap-2">
              Request Bespoke Report <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
