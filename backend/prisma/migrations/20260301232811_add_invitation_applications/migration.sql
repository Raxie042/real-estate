-- CreateEnum
CREATE TYPE "InvitationApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "invitation_applications" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "market" TEXT,
    "portfolio_size" TEXT,
    "message" TEXT,
    "status" "InvitationApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewed_by_id" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "admin_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitation_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "invitation_applications_status_idx" ON "invitation_applications"("status");

-- CreateIndex
CREATE INDEX "invitation_applications_email_idx" ON "invitation_applications"("email");

-- AddForeignKey
ALTER TABLE "invitation_applications" ADD CONSTRAINT "invitation_applications_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
