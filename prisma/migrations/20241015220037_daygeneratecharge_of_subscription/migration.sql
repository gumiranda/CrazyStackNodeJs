/*
  Warnings:

  - The `dayGenerateCharge` column on the `subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "dayGenerateCharge",
ADD COLUMN     "dayGenerateCharge" INTEGER;
