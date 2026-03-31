-- AlterTable
ALTER TABLE "invitation_applications" ADD COLUMN     "last_email_sent_at" TIMESTAMP(3),
ADD COLUMN     "last_email_type" TEXT;
