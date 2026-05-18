-- Add composite index on (latitude, longitude) for geo-search bounding-box queries.
-- Without this, searchByRadius and searchByBounds do a full table scan on every call.
CREATE INDEX "listings_latitude_longitude_idx" ON "listings"("latitude", "longitude");
