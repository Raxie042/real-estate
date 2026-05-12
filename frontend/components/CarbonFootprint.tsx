'use client';

type EPCRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

interface CarbonFootprintProps {
  epcRating?: EPCRating;
  floorAreaM2?: number; // optional, for estimated annual CO2
}

const EPC_DATA: Record<EPCRating, { kgCO2: number; color: string; bg: string; label: string }> = {
  A: { kgCO2: 0,   color: 'text-emerald-700', bg: 'bg-emerald-500', label: 'Net zero / very low' },
  B: { kgCO2: 25,  color: 'text-emerald-600', bg: 'bg-emerald-400', label: 'Low carbon' },
  C: { kgCO2: 55,  color: 'text-lime-600',    bg: 'bg-lime-400',    label: 'Below average' },
  D: { kgCO2: 90,  color: 'text-yellow-600',  bg: 'bg-yellow-400',  label: 'Average' },
  E: { kgCO2: 130, color: 'text-orange-600',  bg: 'bg-orange-400',  label: 'Above average' },
  F: { kgCO2: 180, color: 'text-red-500',     bg: 'bg-red-400',     label: 'High carbon' },
  G: { kgCO2: 250, color: 'text-red-700',     bg: 'bg-red-600',     label: 'Very high carbon' },
};

const UK_AVG_KG = 90; // kgCO2/m²/yr approximate UK average (EPC D band)
const RATINGS: EPCRating[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function CarbonFootprint({ epcRating = 'D', floorAreaM2 }: CarbonFootprintProps) {
  const data = EPC_DATA[epcRating];
  const annualTonnes = floorAreaM2 ? ((data.kgCO2 * floorAreaM2) / 1000).toFixed(1) : null;
  const vsAvg = data.kgCO2 < UK_AVG_KG ? `${Math.round(((UK_AVG_KG - data.kgCO2) / UK_AVG_KG) * 100)}% below UK average`
    : data.kgCO2 > UK_AVG_KG ? `${Math.round(((data.kgCO2 - UK_AVG_KG) / UK_AVG_KG) * 100)}% above UK average`
    : 'Equal to UK average';

  return (
    <div className="rounded-2xl border border-[#E8E1D7] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-0.5">Carbon Footprint</p>
          <p className="text-xs text-[#5F5448]">EPC Rating {epcRating} — {data.label}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg ${data.bg}`}>
          {epcRating}
        </div>
      </div>

      {/* EPC bar */}
      <div className="flex gap-0.5 mb-4">
        {RATINGS.map(r => {
          const d = EPC_DATA[r];
          const isActive = r === epcRating;
          return (
            <div key={r} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-3 rounded-sm ${d.bg} ${isActive ? 'ring-2 ring-[#1C1A17] ring-offset-1' : 'opacity-40'}`} />
              <span className={`text-[9px] font-bold ${isActive ? d.color : 'text-[#C9C4BD]'}`}>{r}</span>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-[#F6F2EC] rounded-xl p-3">
          <p className="text-[#9A8B7A] mb-0.5">Intensity</p>
          <p className="font-semibold text-[#1C1A17]">{data.kgCO2} kgCO₂/m²/yr</p>
        </div>
        {annualTonnes && (
          <div className="bg-[#F6F2EC] rounded-xl p-3">
            <p className="text-[#9A8B7A] mb-0.5">Est. Annual</p>
            <p className="font-semibold text-[#1C1A17]">{annualTonnes} tCO₂/yr</p>
          </div>
        )}
        <div className={`rounded-xl p-3 col-span-${annualTonnes ? 2 : 1}`}>
          <p className={`text-xs font-medium ${data.kgCO2 <= UK_AVG_KG ? 'text-emerald-600' : 'text-orange-600'}`}>{vsAvg}</p>
        </div>
      </div>
    </div>
  );
}
