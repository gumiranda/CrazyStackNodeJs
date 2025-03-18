/*
  Warnings:

  - You are about to drop the column `user1Slug` on the `follow` table. All the data in the column will be lost.
  - You are about to drop the column `user2Slug` on the `follow` table. All the data in the column will be lost.
  - Added the required column `userId` to the `follow` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdById` on table `follow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "follow" DROP COLUMN "user1Slug",
DROP COLUMN "user2Slug",
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL;
