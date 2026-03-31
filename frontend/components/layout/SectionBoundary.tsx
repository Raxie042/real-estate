'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface SectionBoundaryProps {
  children: ReactNode;
  sectionName: string;
}

export default function SectionBoundary({ children, sectionName }: SectionBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F6F3] p-6 text-center">
              <p className="text-[#1C1A17] font-medium">{sectionName} is temporarily unavailable.</p>
              <p className="text-[#7A6E60] text-sm mt-1">The rest of the page is still available.</p>
            </div>
          </div>
        </section>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
