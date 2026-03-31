'use client';

import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useComparisonStore } from '@/lib/comparison-store';

export default function ComparisonBar() {
  const { properties, removeProperty, clearAll } = useComparisonStore();

  if (properties.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#C9A96A] shadow-2xl z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <span className="font-semibold text-[#1C1A17] whitespace-nowrap">
              Compare ({properties.length}/4)
            </span>
            
            <div className="flex gap-3">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="relative flex items-center gap-2 bg-[#F6F2EC] rounded-lg p-2 pr-8 min-w-fit"
                >
                  <Image
                    src={property.images[0] || '/placeholder.jpg'}
                    alt={property.title}
                    width={48}
                    height={48}
                    unoptimized
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1C1A17] truncate max-w-[150px]">
                      {property.title}
                    </p>
                    <p className="text-xs text-[#7A6E60]">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="absolute top-1 right-1 p-1 bg-white rounded-full hover:bg-red-50 transition"
                  >
                    <X className="w-3 h-3 text-[#7A6E60]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-[#7A6E60] hover:text-[#1C1A17] transition whitespace-nowrap"
            >
              Clear All
            </button>
            <Link
              href={`/comparison?ids=${properties.map(p => p.id).join(',')}`}
              className="px-6 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B78F4A] transition flex items-center gap-2 whitespace-nowrap"
            >
              Compare Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
