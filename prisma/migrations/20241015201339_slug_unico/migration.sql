/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "follow" ADD COLUMN     "createdById" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
