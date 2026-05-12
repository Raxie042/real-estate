import StampDutyCalculator from '@/components/StampDutyCalculator';
import Link from 'next/link';

export const metadata = { title: 'Stamp Duty Calculator | Raxie Zenith Estate', description: 'Calculate your UK stamp duty land tax (SDLT) for residential and buy-to-let properties.' };

export default function StampDutyPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Tools & Resources</p>
          <h1 className="text-5xl font-light text-[#1C1A17] lux-heading mb-4">Stamp Duty Calculator</h1>
          <p className="text-[#5F5448] max-w-lg mx-auto">Calculate your England & Northern Ireland SDLT liability instantly — including the 3% additional dwelling surcharge.</p>
        </div>

        <StampDutyCalculator />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: 'Mortgage Calculator', desc: 'Estimate monthly repayments across different rates and terms.', href: '/properties' },
            { title: 'Financing & Private Wealth', desc: 'Access private mortgage and wealth advisory for high-value purchases.', href: '/financing' },
            { title: 'Neighbourhood Guides', desc: 'Research local property markets before you commit to a search area.', href: '/neighbourhoods' },
          ].map(item => (
            <Link key={item.title} href={item.href} className="lux-card p-6 hover:shadow-lg transition-shadow block">
              <h3 className="font-semibold text-[#1C1A17] mb-2">{item.title}</h3>
              <p className="text-sm text-[#7A6E60]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
