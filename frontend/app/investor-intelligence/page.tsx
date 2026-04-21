'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

export default function InvestorIntelligencePage() {
  const [growthLimit, setGrowthLimit] = useState(10);
  const [growthMinListings, setGrowthMinListings] = useState(5);
  const [growthLoading, setGrowthLoading] = useState(false);
  const [growthData, setGrowthData] = useState<any[]>([]);

  const [roiCountriesText, setRoiCountriesText] = useState('US, UK, United Arab Emirates');
  const [roiInvestment, setRoiInvestment] = useState(750000);
  const [roiYears, setRoiYears] = useState(5);
  const [roiLoading, setRoiLoading] = useState(false);
  const [roiData, setRoiData] = useState<any[]>([]);

  const [dealCountriesText, setDealCountriesText] = useState('US, UK');
  const [dealMinBeds, setDealMinBeds] = useState(3);
  const [dealMinPrice, setDealMinPrice] = useState(1000000);
  const [dealLoading, setDealLoading] = useState(false);
  const [dealData, setDealData] = useState<any[]>([]);

  const [error, setError] = useState('');

  const roiCountries = useMemo(
    () =>
      roiCountriesText
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    [roiCountriesText],
  );

  const dealCountries = useMemo(
    () =>
      dealCountriesText
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    [dealCountriesText],
  );

  const loadGrowth = async () => {
    setGrowthLoading(true);
    setError('');
    try {
      const response = await api.ai.getGlobalGrowthAreas({
        limit: growthLimit,
        minListings: growthMinListings,
      });
      setGrowthData(response.data?.areas || []);
    } catch {
      setError('Failed to load global growth predictions.');
      setGrowthData([]);
    } finally {
      setGrowthLoading(false);
    }
  };

  const loadRoi = async () => {
    setRoiLoading(true);
    setError('');
    try {
      const response = await api.ai.compareGlobalRoi({
        investmentAmount: roiInvestment,
        holdingPeriodYears: roiYears,
        targetCountries: roiCountries,
        listingType: 'SALE',
      });
      setRoiData(response.data?.comparisons || []);
    } catch {
      setError('Failed to load ROI comparison.');
      setRoiData([]);
    } finally {
      setRoiLoading(false);
    }
  };

  const loadDeals = async () => {
    setDealLoading(true);
    setError('');
    try {
      const response = await api.ai.getOffMarketLuxuryDeals({
        countries: dealCountries,
        minBedrooms: dealMinBeds,
        minPrice: dealMinPrice,
        limit: 25,
      });
      setDealData(response.data?.deals || []);
    } catch {
      setError('Failed to load off-market luxury deals.');
      setDealData([]);
    } finally {
      setDealLoading(false);
    }
  };

  useEffect(() => {
    void loadGrowth();
    void loadRoi();
    void loadDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="lux-card p-6">
          <h1 className="text-3xl font-semibold text-[#1C1A17]">Investor Intelligence</h1>
          <p className="text-[#7A6E60] mt-2">
            Global growth prediction, instant cross-country ROI benchmarking, and automated off-market luxury deal discovery.
          </p>
          {error ? <p className="text-red-600 mt-3 text-sm">{error}</p> : null}
        </header>

        <section className="lux-card p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-[#1C1A17]">1) Global High-Growth Areas</h2>
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="lux-input w-28"
                min={1}
                max={50}
                value={growthLimit}
                onChange={(event) => setGrowthLimit(Number(event.target.value || 10))}
              />
              <input
                type="number"
                className="lux-input w-32"
                min={1}
                max={100}
                value={growthMinListings}
                onChange={(event) => setGrowthMinListings(Number(event.target.value || 5))}
              />
              <button className="lux-button" onClick={() => void loadGrowth()} disabled={growthLoading}>
                {growthLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          <div className="overflow-auto rounded-lg border border-[#E8E1D7]">
            <table className="w-full text-sm">
              <thead className="bg-[#F6F2EC]">
                <tr>
                  <th className="text-left px-3 py-2">Area</th>
                  <th className="text-right px-3 py-2">Growth Score</th>
                  <th className="text-right px-3 py-2">Price Momentum</th>
                  <th className="text-right px-3 py-2">Inventory Momentum</th>
                  <th className="text-right px-3 py-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {growthData.map((row: any) => (
                  <tr key={`${row.area.city}-${row.area.country}-${row.growthScore}`} className="border-t border-[#EEE7DC]">
                    <td className="px-3 py-2">
                      {row.area.city}, {row.area.state || '-'} ({row.area.country})
                    </td>
                    <td className="px-3 py-2 text-right font-semibold">{Number(row.growthScore || 0).toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">{Number(row.metrics?.priceMomentum || 0).toFixed(2)}%</td>
                    <td className="px-3 py-2 text-right">{Number(row.metrics?.inventoryMomentum || 0).toFixed(2)}%</td>
                    <td className="px-3 py-2 text-right">{row.confidence || 0}%</td>
                  </tr>
                ))}
                {growthData.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3 text-[#7A6E60]" colSpan={5}>
                      No growth rows returned for current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="lux-card p-6">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <h2 className="text-xl font-semibold text-[#1C1A17] mr-3">2) Cross-Country ROI Comparison</h2>
            <input
              className="lux-input min-w-[260px]"
              value={roiCountriesText}
              onChange={(event) => setRoiCountriesText(event.target.value)}
              placeholder="Countries comma separated"
            />
            <input
              type="number"
              className="lux-input w-40"
              value={roiInvestment}
              min={10000}
              onChange={(event) => setRoiInvestment(Number(event.target.value || 750000))}
            />
            <input
              type="number"
              className="lux-input w-28"
              value={roiYears}
              min={1}
              max={30}
              onChange={(event) => setRoiYears(Number(event.target.value || 5))}
            />
            <button className="lux-button" onClick={() => void loadRoi()} disabled={roiLoading}>
              {roiLoading ? 'Loading...' : 'Compare'}
            </button>
          </div>

          <div className="overflow-auto rounded-lg border border-[#E8E1D7]">
            <table className="w-full text-sm">
              <thead className="bg-[#F6F2EC]">
                <tr>
                  <th className="text-left px-3 py-2">Country</th>
                  <th className="text-right px-3 py-2">Median Price (USD)</th>
                  <th className="text-right px-3 py-2">Net Yield</th>
                  <th className="text-right px-3 py-2">Annual Appreciation</th>
                  <th className="text-right px-3 py-2">Projected ROI</th>
                </tr>
              </thead>
              <tbody>
                {roiData.map((row: any) => (
                  <tr key={`${row.countryCode}-${row.score}`} className="border-t border-[#EEE7DC]">
                    <td className="px-3 py-2">{row.country}</td>
                    <td className="px-3 py-2 text-right">${Number(row.benchmarks?.medianSalePriceUsd || 0).toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">{Number(row.benchmarks?.netYieldPct || 0).toFixed(2)}%</td>
                    <td className="px-3 py-2 text-right">{Number(row.benchmarks?.annualAppreciationPct || 0).toFixed(2)}%</td>
                    <td className="px-3 py-2 text-right font-semibold">{Number(row.investorScenario?.projectedRoiPct || 0).toFixed(2)}%</td>
                  </tr>
                ))}
                {roiData.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3 text-[#7A6E60]" colSpan={5}>
                      No ROI comparisons found for those markets yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="lux-card p-6">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <h2 className="text-xl font-semibold text-[#1C1A17] mr-3">3) Off-Market Luxury Deal Finder</h2>
            <input
              className="lux-input min-w-[220px]"
              value={dealCountriesText}
              onChange={(event) => setDealCountriesText(event.target.value)}
              placeholder="Countries comma separated"
            />
            <input
              type="number"
              className="lux-input w-28"
              value={dealMinBeds}
              min={0}
              onChange={(event) => setDealMinBeds(Number(event.target.value || 0))}
            />
            <input
              type="number"
              className="lux-input w-44"
              value={dealMinPrice}
              min={0}
              onChange={(event) => setDealMinPrice(Number(event.target.value || 0))}
            />
            <button className="lux-button" onClick={() => void loadDeals()} disabled={dealLoading}>
              {dealLoading ? 'Loading...' : 'Find Deals'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {dealData.map((deal: any) => (
              <article key={deal.listingId} className="rounded-xl border border-[#E8E1D7] bg-white p-4">
                <h3 className="font-semibold text-[#1C1A17] line-clamp-2">{deal.title}</h3>
                <p className="text-sm text-[#7A6E60] mt-1">
                  {deal.city}, {deal.state || '-'} ({deal.country})
                </p>
                <p className="mt-2 text-[#1C1A17] font-semibold">${Number(deal.price || 0).toLocaleString()}</p>
                <div className="mt-2 text-sm text-[#5F5448]">
                  <div>Bedrooms: {deal.bedrooms ?? '-'}</div>
                  <div>Deal Score: {Number(deal.dealScore || 0).toFixed(2)}</div>
                  <div>Off-Market Signal: {deal.offMarketSignal ? 'Yes' : 'No'}</div>
                </div>
              </article>
            ))}
            {dealData.length === 0 ? (
              <p className="text-[#7A6E60]">No luxury deal candidates for current filters.</p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
