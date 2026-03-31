'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { convertCurrency, formatPrice } from '@/lib/utils';
import { Layers } from 'lucide-react';
import { usePreferences } from '@/lib/preferences-context';
import { getValidMapboxPublicToken } from '@/lib/mapbox';

interface Listing {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  price: number;
  currency?: string;
  bedrooms: number;
  bathrooms: number;
}

interface ListingsMapProps {
  listings: Listing[];
  height?: string;
  onMarkerClick?: (listing: Listing) => void;
  enableClustering?: boolean;
}

export default function ListingsMap({
  listings,
  height = '500px',
  onMarkerClick,
  enableClustering = true,
}: ListingsMapProps) {
  const { preferences, locale } = usePreferences();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapStyle, setMapStyle] = useState('streets-v12');
  const [showControls, setShowControls] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const token = getValidMapboxPublicToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

    if (!token) {
      setMapError('Map unavailable: invalid or missing Mapbox token');
      return;
    }

    setMapError(null);

    mapboxgl.accessToken = token;

    if (map.current) return;

    if (!listings || listings.length === 0) {
      return;
    }

    try {
      const bounds = new mapboxgl.LngLatBounds();
      listings.forEach(listing => {
        bounds.extend([listing.longitude, listing.latitude]);
      });

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: `mapbox://styles/mapbox/${mapStyle}`,
        center: bounds.getCenter(),
        zoom: 12,
      });

      map.current.on('error', (event: any) => {
        const message = String(event?.error?.message || '').toLowerCase();
        if (message.includes('token') || message.includes('access')) {
          setMapError('Map unavailable: Mapbox access token is invalid');
          markersRef.current.forEach(marker => marker.remove());
          markersRef.current = [];
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        }
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        }),
        'top-right'
      );

      // Add markers
      listings.forEach(listing => {
        const convertedPrice = convertCurrency(
          listing.price,
          listing.currency || 'USD',
          preferences.currency
        );
        const priceLabel = formatPrice(convertedPrice, preferences.currency, locale);
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="width:16rem;">
            <div style="font-weight:600;font-size:12px;margin-bottom:6px;color:#1C1A17;">${listing.title}</div>
            <div style="font-size:11px;margin-bottom:6px;color:#7A6E60;">${listing.address}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="font-weight:600;color:#C9A96A;">${priceLabel}</div>
              <div style="font-size:11px;color:#7A6E60;">${listing.bedrooms} bed • ${listing.bathrooms} bath</div>
            </div>
          </div>`
        );

        const marker = new mapboxgl.Marker({ color: '#C9A96A' })
          .setLngLat([listing.longitude, listing.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        marker.getElement().addEventListener('click', () => {
          if (onMarkerClick) onMarkerClick(listing);
        });

        markersRef.current.push(marker);
      });

      map.current.fitBounds(bounds, { padding: 50 });
    } catch (error) {
      setMapError('Map unavailable right now');
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [listings, mapStyle, onMarkerClick, preferences.currency, locale]);

  const mapStyles = [
    { id: 'streets-v12', name: 'Streets' },
    { id: 'satellite-streets-v12', name: 'Satellite' },
    { id: 'light-v11', name: 'Light' },
    { id: 'dark-v11', name: 'Dark' },
  ];

  return (
    <div className="relative" style={{ height }}>
      {mapError && (
        <div className="absolute inset-0 z-20 rounded-xl border border-[#E8E1D7] bg-[#F8F6F3] flex items-center justify-center p-6">
          <p className="text-sm text-[#7A6E60] text-center">{mapError}</p>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-xl overflow-hidden border border-[#E8E1D7]" />
      
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-[#F8F6F3] transition border border-[#E8E1D7]"
        >
          <Layers className="w-5 h-5 text-[#5F5448]" />
        </button>
        
        {showControls && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-[#E8E1D7] overflow-hidden">
            {mapStyles.map(style => (
              <button
                key={style.id}
                onClick={() => {
                  setMapStyle(style.id);
                  setShowControls(false);
                  if (map.current) {
                    map.current.setStyle(`mapbox://styles/mapbox/${style.id}`);
                  }
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-[#F8F6F3] transition ${
                  mapStyle === style.id ? 'bg-[#F8F6F3] font-semibold text-[#C9A96A]' : 'text-[#5F5448]'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
