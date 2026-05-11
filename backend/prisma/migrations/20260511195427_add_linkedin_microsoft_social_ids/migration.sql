/*
  Warnings:

  - A unique constraint covering the columns `[linkedin_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[microsoft_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "linkedin_id" TEXT,
ADD COLUMN     "microsoft_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_linkedin_id_key" ON "users"("linkedin_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_microsoft_id_key" ON "users"("microsoft_id");
