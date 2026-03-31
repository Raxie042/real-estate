-- AlterTable
ALTER TABLE "listings"
ADD COLUMN "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verified_at" TIMESTAMP(3),
ADD COLUMN "verified_by_id" TEXT;

-- CreateEnum
CREATE TYPE "ListingReportStatus" AS ENUM ('PENDING', 'REVIEWING', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "listing_reports" (
  "id" TEXT NOT NULL,
  "listing_id" TEXT NOT NULL,
  "reporter_id" TEXT,
  "reason" TEXT NOT NULL,
  "details" TEXT,
  "status" "ListingReportStatus" NOT NULL DEFAULT 'PENDING',
  "reviewed_by_id" TEXT,
  "reviewed_at" TIMESTAMP(3),
  "review_notes" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "listing_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "listing_reports_listing_id_idx" ON "listing_reports"("listing_id");
CREATE INDEX "listing_reports_reporter_id_idx" ON "listing_reports"("reporter_id");
CREATE INDEX "listing_reports_status_idx" ON "listing_reports"("status");

-- AddForeignKey
ALTER TABLE "listing_reports"
ADD CONSTRAINT "listing_reports_listing_id_fkey"
FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;