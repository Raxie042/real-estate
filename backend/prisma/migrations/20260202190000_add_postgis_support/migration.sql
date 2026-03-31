-- Add performance indexes for common real estate searches

CREATE INDEX IF NOT EXISTS listings_city_state_idx 
ON listings(city, state);

CREATE INDEX IF NOT EXISTS listings_created_at_idx 
ON listings("created_at" DESC);

CREATE INDEX IF NOT EXISTS listings_status_published_idx 
ON listings(status, "published_at" DESC);

CREATE INDEX IF NOT EXISTS listings_price_idx 
ON listings(price);

CREATE INDEX IF NOT EXISTS favorites_user_created_idx 
ON favorites(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS viewing_history_listing_created_idx 
ON viewing_history(listing_id, viewed_at DESC);

CREATE INDEX IF NOT EXISTS viewing_history_user_created_idx 
ON viewing_history(user_id, viewed_at DESC);

CREATE INDEX IF NOT EXISTS transactions_listing_buyer_idx 
ON transactions(listing_id, buyer_id);

CREATE INDEX IF NOT EXISTS transactions_status_idx 
ON transactions(status);

CREATE INDEX IF NOT EXISTS notifications_user_read_idx 
ON notifications(user_id, is_read, created_at DESC);

CREATE INDEX IF NOT EXISTS saved_searches_user_active_idx 
ON saved_searches(user_id, is_active);

-- Note: To enable PostGIS for advanced geospatial queries:
-- 1. Install PostGIS on your PostgreSQL server
-- 2. Run: CREATE EXTENSION IF NOT EXISTS postgis;
-- 3. Add to listings table: ALTER TABLE listings ADD COLUMN geom geometry(Point, 4326);
-- 4. Create index: CREATE INDEX listings_geom_idx ON listings USING GIST (geom);
