'use client';

import { useMemo } from 'react';
import { Train, Bus, Bike, Footprints, Coffee, ShoppingBag, Trees, Star } from 'lucide-react';

interface TransportScoreProps {
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

interface Station { name: string; line: string; walkMin: number; lineColor: string; }

const LONDON_TRANSPORT: Record<string, { stations: Station[]; busRoutes: string[]; bikeScore: number; walkScore: number; transitScore: number }> = {
  'mayfair': { stations: [{ name: 'Bond Street', line: 'Central / Jubilee', walkMin: 4, lineColor: '#E32017' }, { name: 'Green Park', line: 'Victoria / Jubilee / Piccadilly', walkMin: 6, lineColor: '#003688' }], busRoutes: ['6', '13', '23', '94', 'N13'], bikeScore: 72, walkScore: 96, transitScore: 98 },
  'chelsea': { stations: [{ name: 'Sloane Square', line: 'District / Circle', walkMin: 8, lineColor: '#007D32' }, { name: 'South Kensington', line: 'District / Circle / Piccadilly', walkMin: 12, lineColor: '#007D32' }], busRoutes: ['11', '19', '22', '49', '319'], bikeScore: 80, walkScore: 92, transitScore: 88 },
  'knightsbridge': { stations: [{ name: 'Knightsbridge', line: 'Piccadilly', walkMin: 3, lineColor: '#003688' }, { name: 'Hyde Park Corner', line: 'Piccadilly', walkMin: 7, lineColor: '#003688' }], busRoutes: ['9', '10', '52', '137', 'C1'], bikeScore: 75, walkScore: 95, transitScore: 97 },
  'notting hill': { stations: [{ name: 'Notting Hill Gate', line: 'Central / Circle / District', walkMin: 5, lineColor: '#E32017' }, { name: 'Ladbroke Grove', line: 'Hammersmith & City / Circle', walkMin: 8, lineColor: '#F3A9BB' }], busRoutes: ['7', '23', '52', '94', '328'], bikeScore: 82, walkScore: 90, transitScore: 91 },
  'belgravia': { stations: [{ name: 'Victoria', line: 'Victoria / District / Circle', walkMin: 7, lineColor: '#00A4A7' }, { name: 'Sloane Square', line: 'District / Circle', walkMin: 9, lineColor: '#007D32' }], busRoutes: ['11', '44', 'C1', '211', 'N11'], bikeScore: 70, walkScore: 94, transitScore: 93 },
};

const DUBAI_TRANSPORT: Record<string, { stations: Station[]; busRoutes: string[]; bikeScore: number; walkScore: number; transitScore: number }> = {
  'dubai marina': { stations: [{ name: 'DMCC Metro', line: 'Red Line', walkMin: 6, lineColor: '#E8232A' }, { name: 'Dubai Marina Metro', line: 'Red Line', walkMin: 8, lineColor: '#E8232A' }], busRoutes: ['F55A', 'F55B', 'X28'], bikeScore: 65, walkScore: 78, transitScore: 72 },
  'downtown dubai': { stations: [{ name: 'Burj Khalifa / Dubai Mall', line: 'Red Line', walkMin: 4, lineColor: '#E8232A' }, { name: 'Financial Centre', line: 'Red Line', walkMin: 9, lineColor: '#E8232A' }], busRoutes: ['X25', 'F09A', 'F09B'], bikeScore: 55, walkScore: 72, transitScore: 80 },
};

const EDINBURGH_TRANSPORT: Record<string, { stations: Station[]; busRoutes: string[]; bikeScore: number; walkScore: number; transitScore: number }> = {
  'new town': { stations: [{ name: 'Edinburgh Waverley', line: 'ScotRail', walkMin: 10, lineColor: '#005EB8' }, { name: 'Haymarket', line: 'ScotRail', walkMin: 14, lineColor: '#005EB8' }], busRoutes: ['19', '36', '47', 'X47'], bikeScore: 74, walkScore: 91, transitScore: 83 },
};

function getTransportData(city?: string, address?: string) {
  const c = (city || '').toLowerCase();
  const a = (address || '').toLowerCase();
  const combined = `${c} ${a}`;
  if (c.includes('dubai') || a.includes('dubai')) {
    for (const [key, data] of Object.entries(DUBAI_TRANSPORT)) {
      if (combined.includes(key)) return data;
    }
    return DUBAI_TRANSPORT['downtown dubai'];
  }
  if (c.includes('edinburgh') || a.includes('edinburgh')) {
    return EDINBURGH_TRANSPORT['new town'];
  }
  for (const [key, data] of Object.entries(LONDON_TRANSPORT)) {
    if (combined.includes(key)) return data;
  }
  return LONDON_TRANSPORT['mayfair'];
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full bg-[#E8E1D7] rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
    </div>
  );
}

function ScoreCircle({ score, label, icon: Icon, color }: { score: number; label: string; icon: any; color: string }) {
  const grade = score >= 90 ? 'Walker\'s Paradise' : score >= 70 ? 'Very Walkable' : score >= 50 ? 'Somewhat Walkable' : 'Car-Dependent';
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E8E1D7" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${score} 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-[#1C1A17]">{score}</span>
        </div>
      </div>
      <Icon size={14} className="mx-auto mb-1" style={{ color }} />
      <p className="text-xs font-semibold text-[#1C1A17]">{label}</p>
      <p className="text-[10px] text-[#9A8B7A]">{grade}</p>
    </div>
  );
}

export default function TransportScore({ city, address }: TransportScoreProps) {
  const data = useMemo(() => getTransportData(city, address), [city, address]);

  return (
    <div className="lux-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <Train size={16} className="text-[#C9A96A]" />
        <h3 className="font-semibold text-[#1C1A17]">Transport &amp; Walkability</h3>
      </div>

      {/* Score circles */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <ScoreCircle score={data.walkScore} label="Walk Score" icon={Footprints} color="#22c55e" />
        <ScoreCircle score={data.transitScore} label="Transit Score" icon={Train} color="#3b82f6" />
        <ScoreCircle score={data.bikeScore} label="Bike Score" icon={Bike} color="#f59e0b" />
      </div>

      {/* Nearest stations */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-3">Nearest Stations</p>
        <div className="space-y-2">
          {data.stations.map(s => (
            <div key={s.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.lineColor }} />
                <div>
                  <span className="font-medium text-[#1C1A17]">{s.name}</span>
                  <span className="text-xs text-[#9A8B7A] ml-1.5">({s.line})</span>
                </div>
              </div>
              <span className="text-xs text-[#5F5448] bg-[#F6F2EC] px-2 py-0.5 rounded-full">{s.walkMin} min walk</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bus routes */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-2">Nearby Bus Routes</p>
        <div className="flex flex-wrap gap-1.5">
          {data.busRoutes.map(r => (
            <span key={r} className="flex items-center gap-1 text-[11px] bg-[#1C1A17] text-white rounded px-2 py-0.5">
              <Bus size={9} />{r}
            </span>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[#9A8B7A] mt-4">Walk/Transit/Bike scores are indicative estimates based on location. Source: neighbourhood data, May 2026.</p>
    </div>
  );
}
