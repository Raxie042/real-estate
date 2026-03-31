export class GeoLocationDto {
  latitude: number;
  longitude: number;
}

export class GeoRadiusDto extends GeoLocationDto {
  radius: number; // in kilometers
}

export class GeoBoundsDto {
  north: number;
  south: number;
  east: number;
  west: number;
}

export class GeoPolygonDto {
  coordinates: [number, number][]; // Array of [lng, lat]
}

// Helper to convert lat/lng to PostGIS POINT
export function createPoint(lat: number, lng: number): string {
  return `POINT(${lng} ${lat})`;
}

// Helper to calculate distance using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
