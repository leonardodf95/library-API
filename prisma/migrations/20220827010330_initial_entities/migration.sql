/*
  Warnings:

  - You are about to drop the column `language` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "language",
ADD COLUMN     "doweySystem" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookrents" (
    "userID" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "rentBegin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rentFinish" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookrents_pkey" PRIMARY KEY ("userID","bookId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookrents" ADD CONSTRAINT "bookrents_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookrents" ADD CONSTRAINT "bookrents_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
