'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface PropertyCategory {
  image: string;
  label: string;
  count: string;
  type: string;
}

export default function SearchSection() {
  const [categories, setCategories] = useState<PropertyCategory[]>([
    { image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop', label: 'Houses', count: '0', type: 'houses' },
    { image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', label: 'Apartments', count: '0', type: 'apartments' },
    { image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', label: 'Commercial', count: '0', type: 'commercial' },
    { image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop', label: 'Land', count: '0', type: 'land' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyCounts = async () => {
      try {
        // Fetch listings to group by type
        const response = await api.listings.getAll({ limit: 1000 });
        const listings = response.data.listings || [];
        
        // Count listings by type
        const counts = {
          houses: 0,
          apartments: 0,
          commercial: 0,
          land: 0,
        };

        listings.forEach((listing: any) => {
          const type = listing.propertyType?.toLowerCase() || 'houses';
          if (type in counts) {
            counts[type as keyof typeof counts]++;
          }
        });

        // Update categories with actual counts
        setCategories(prev => prev.map(cat => ({
          ...cat,
          count: counts[cat.type as keyof typeof counts].toLocaleString(),
        })));
      } catch (error) {
        console.error('Failed to fetch property counts:', error);
        // Keep default counts on error
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyCounts();
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] mb-3">Property Categories</p>
          <h2 className="text-3xl font-semibold mb-4">What are you looking for?</h2>
          <p className="text-[#6E6255]">Choose your property type</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ image, label, count, type }) => (
            <Link key={label} href={`/search?type=${type}`}>
              <div className="lux-card overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-40px_rgba(20,15,10,0.7)] transition">
                <div className="relative h-32 w-full">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-[#1C1A17]">{label}</h3>
                  <p className="text-[#8B7D6A] text-sm">{loading ? 'Loading...' : `${count} properties`}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
