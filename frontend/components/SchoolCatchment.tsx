'use client';

import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { MapPin, GraduationCap, Star, ExternalLink } from 'lucide-react';

interface Props {
  latitude?: number;
  longitude?: number;
  city?: string;
}

// Mock school data — in production this would call an Ofsted/EduBase API
function getSchoolsNearCity(city: string) {
  const schoolSets: Record<string, typeof LONDON_SCHOOLS> = {
    london: LONDON_SCHOOLS,
    dubai: DUBAI_SCHOOLS,
    edinburgh: EDINBURGH_SCHOOLS,
  };
  const key = city.toLowerCase();
  for (const [k, v] of Object.entries(schoolSets)) {
    if (key.includes(k)) return v;
  }
  return LONDON_SCHOOLS; // default
}

const LONDON_SCHOOLS = [
  { name: 'The Harrodian School', type: 'Independent', phase: 'Primary & Secondary', rating: 'Outstanding', ratingScore: 5, distance: '0.4 mi', ages: '4–18', url: 'https://www.harrodian.com' },
  { name: 'Hill House International Junior School', type: 'Independent', phase: 'Primary', rating: 'Excellent', ratingScore: 5, distance: '0.6 mi', ages: '4–13', url: '#' },
  { name: 'Fulham Primary School', type: 'State', phase: 'Primary', rating: 'Outstanding', ratingScore: 5, distance: '0.8 mi', ages: '5–11', url: '#' },
  { name: 'Lady Margaret School', type: 'State Academy', phase: 'Secondary', rating: 'Outstanding', ratingScore: 5, distance: '1.1 mi', ages: '11–18', url: '#' },
  { name: 'Latymer Upper School', type: 'Independent', phase: 'Secondary', rating: 'Excellent', ratingScore: 5, distance: '1.4 mi', ages: '11–18', url: '#' },
  { name: 'Kensington Aldridge Academy', type: 'State Academy', phase: 'Secondary', rating: 'Good', ratingScore: 4, distance: '1.9 mi', ages: '11–18', url: '#' },
];

const DUBAI_SCHOOLS = [
  { name: 'GEMS Wellington International School', type: 'International', phase: 'Primary & Secondary', rating: 'Outstanding', ratingScore: 5, distance: '0.6 mi', ages: '3–18', url: '#' },
  { name: 'Emirates International School – Meadows', type: 'International', phase: 'Primary & Secondary', rating: 'Outstanding', ratingScore: 5, distance: '0.9 mi', ages: '3–18', url: '#' },
  { name: 'Dubai British School', type: 'International', phase: 'Primary & Secondary', rating: 'Good', ratingScore: 4, distance: '1.2 mi', ages: '3–18', url: '#' },
  { name: 'Jumeirah English Speaking School', type: 'International', phase: 'Primary', rating: 'Outstanding', ratingScore: 5, distance: '1.5 mi', ages: '3–11', url: '#' },
];

const EDINBURGH_SCHOOLS = [
  { name: 'George Watson\'s College', type: 'Independent', phase: 'All through', rating: 'Excellent', ratingScore: 5, distance: '0.7 mi', ages: '3–18', url: '#' },
  { name: 'The Edinburgh Academy', type: 'Independent', phase: 'All through', rating: 'Excellent', ratingScore: 5, distance: '0.9 mi', ages: '5–18', url: '#' },
  { name: 'Boroughmuir High School', type: 'State', phase: 'Secondary', rating: 'Very Good', ratingScore: 4, distance: '1.0 mi', ages: '12–18', url: '#' },
  { name: 'Bruntsfield Primary School', type: 'State', phase: 'Primary', rating: 'Very Good', ratingScore: 4, distance: '0.5 mi', ages: '5–12', url: '#' },
];

const RATING_COLORS: Record<string, string> = {
  Outstanding: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Very Good': 'bg-blue-50 text-blue-700 border-blue-200',
  Good: 'bg-blue-50 text-blue-700 border-blue-200',
  'Requires Improvement': 'bg-amber-50 text-amber-700 border-amber-200',
  Inadequate: 'bg-red-50 text-red-700 border-red-200',
};

export default function SchoolCatchment({ city }: Props) {
  const displayCity = city || 'London';
  const schools = getSchoolsNearCity(displayCity);
  const primary = schools.filter(s => s.phase.toLowerCase().includes('primary') || s.phase.toLowerCase().includes('all'));
  const secondary = schools.filter(s => s.phase.toLowerCase().includes('secondary') || s.phase.toLowerCase().includes('all'));

  return (
    <div className="lux-card p-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-[#1C1A17] flex items-center gap-2">
          <GraduationCap size={20} className="text-[#C9A96A]" />
          Schools & Catchment
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-[#7A6E60]">
          <MapPin size={12} />
          Near {displayCity}
        </div>
      </div>

      <div className="space-y-3">
        {schools.map((school) => (
          <div key={school.name} className="flex items-center justify-between gap-3 py-3 border-b border-[#F0EBE3] last:border-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#1C1A17]">{school.name}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${RATING_COLORS[school.rating] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {school.rating}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-[#7A6E60]">
                <span>{school.type}</span>
                <span>·</span>
                <span>Ages {school.ages}</span>
                <span>·</span>
                <span>{school.phase}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs font-medium text-[#5F5448] bg-[#F6F2EC] px-2 py-1 rounded-lg">{school.distance}</span>
              {school.url !== '#' && (
                <a href={school.url} target="_blank" rel="noopener noreferrer" className="text-[#C9A96A] hover:text-[#B78F4A]">
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#9A8B7A] mt-4">
        Ratings are Ofsted / KHDA / HMIe grades. Catchment boundaries change annually — confirm with the local authority. Distances are approximate.
      </p>
    </div>
  );
}
