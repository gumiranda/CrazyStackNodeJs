/*
  Warnings:

  - You are about to drop the column `subcategoryName` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "subcategoryName";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "preferences";
