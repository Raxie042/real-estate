'use client';

import { useState, useEffect, useCallback } from 'react';
import OpenHouseCard from './OpenHouseCard';

interface OpenHouse {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  maxAttendees: number;
  rsvps: any[];
}

interface OpenHouseListProps {
  listingId: string;
}

export default function OpenHouseList({ listingId }: OpenHouseListProps) {
  const [openHouses, setOpenHouses] = useState<OpenHouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpenHouses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/open-houses/listing/${listingId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch open houses');
      }

      const data = await response.json();
      setOpenHouses(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching open houses:', err);
      setError('Failed to load open houses');
    } finally {
      setIsLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    fetchOpenHouses();
  }, [fetchOpenHouses]);

  const handleRSVP = () => {
    // Refresh open houses after RSVP
    fetchOpenHouses();
  };

  if (isLoading) {
    return (
      <div className="lux-card p-6">
        <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">Open Houses</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lux-card p-6">
        <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">Open Houses</h3>
        <p className="text-[#7A6E60]">{error}</p>
      </div>
    );
  }

  if (openHouses.length === 0) {
    return (
      <div className="lux-card p-6">
        <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">Open Houses</h3>
        <p className="text-[#7A6E60]">No upcoming open houses scheduled for this property.</p>
      </div>
    );
  }

  return (
    <div className="lux-card p-6">
      <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">
        Open Houses ({openHouses.length})
      </h3>
      <div className="space-y-4">
        {openHouses.map((openHouse) => (
          <OpenHouseCard
            key={openHouse.id}
            openHouse={openHouse}
            onRSVP={handleRSVP}
          />
        ))}
      </div>
    </div>
  );
}
