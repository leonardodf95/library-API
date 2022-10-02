/*
  Warnings:

  - The primary key for the `bookrents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is` on the `bookrents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookrents" DROP CONSTRAINT "bookrents_pkey",
DROP COLUMN "is",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "bookrents_pkey" PRIMARY KEY ("id");
