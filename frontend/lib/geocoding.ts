export type GeocodeResult = {
  latitude: number;
  longitude: number;
  label: string;
};

export async function geocodeAddress(address: string, token: string): Promise<GeocodeResult | null> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${token}`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid or unauthorized Mapbox token');
    }
    throw new Error('Geocoding request failed');
  }

  const data = await response.json();
  const feature = data?.features?.[0];
  if (!feature || !Array.isArray(feature.center) || feature.center.length < 2) {
    return null;
  }

  return {
    longitude: feature.center[0],
    latitude: feature.center[1],
    label: feature.place_name || address,
  };
}
