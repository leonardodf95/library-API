/*
  Warnings:

  - You are about to drop the column `assessment` on the `bookrents` table. All the data in the column will be lost.
  - Made the column `rentFinish` on table `bookrents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookrents" DROP COLUMN "assessment",
ADD COLUMN     "penalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "rentBegin" DROP DEFAULT,
ALTER COLUMN "rentFinish" SET NOT NULL;
