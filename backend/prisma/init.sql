-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create spatial index function for listings
CREATE OR REPLACE FUNCTION create_spatial_index()
RETURNS void AS $$
BEGIN
  -- This will be run after migrations
  -- CREATE INDEX listings_location_idx ON listings USING GIST(location);
END;
$$ LANGUAGE plpgsql;
