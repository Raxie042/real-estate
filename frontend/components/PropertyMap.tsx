'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getValidMapboxPublicToken } from '@/lib/mapbox';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
  title: string;
  height?: string;
}

export default function PropertyMap({
  latitude,
  longitude,
  address,
  title,
  height = '400px',
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const token = useMemo(
    () => getValidMapboxPublicToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN),
    []
  );

  useEffect(() => {
    if (!token) {
      setMapError('Map unavailable: invalid or missing Mapbox token');
      return;
    }

    mapboxgl.accessToken = token;

    if (map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 15,
      });

      map.current.on('error', (event: any) => {
        const message = String(event?.error?.message || '').toLowerCase();
        if (message.includes('token') || message.includes('access')) {
          setMapError('Map unavailable: Mapbox access token is invalid');
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        }
      });

      // Add marker
      new mapboxgl.Marker({ color: '#C9A96A' })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="font-weight:600;font-size:12px;color:#1C1A17;">${title}</div><div style="font-size:11px;color:#7A6E60;">${address}</div>`
          )
        )
        .addTo(map.current);

      // Open popup by default
      map.current.on('load', () => {
        const markers = document.querySelectorAll('.mapboxgl-marker');
        if (markers.length > 0) {
          (markers[0] as any).click();
        }
      });
    } catch (error) {
      setMapError('Map unavailable right now');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, address, title, token]);

  if (mapError) {
    return (
      <div
        style={{ height }}
        className="rounded-2xl overflow-hidden border border-[#E8E1D7] bg-[#F8F6F3] flex items-center justify-center p-6"
      >
        <p className="text-sm text-[#7A6E60] text-center">{mapError}</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      style={{ height }}
      className="rounded-2xl overflow-hidden border border-[#E8E1D7]"
    />
  );
}
