/*
  Warnings:

  - You are about to drop the `newsletter_subscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "newsletter_subscribers";

-- CreateTable
CREATE TABLE "NewsSubscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsSubscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsLetter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NewsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsSubscribers_email_key" ON "NewsSubscribers"("email");
