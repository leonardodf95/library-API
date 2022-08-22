-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishing_company" TEXT NOT NULL,
    "language" TEXT,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
