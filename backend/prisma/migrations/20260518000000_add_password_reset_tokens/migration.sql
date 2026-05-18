-- AlterTable: add password reset token fields to users
ALTER TABLE "users" ADD COLUMN "reset_password_token" TEXT;
ALTER TABLE "users" ADD COLUMN "reset_password_token_expiry" TIMESTAMP(3);
