/*
  Warnings:

  - You are about to drop the `NewsLetterStatus` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unsubscribeToken]` on the table `NewsSubscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "NewsLetterStatus";

-- CreateTable
CREATE TABLE "MTStatus" (
    "subscriberId" INTEGER NOT NULL,
    "newsLetterId" INTEGER NOT NULL,
    "letterSent" BOOLEAN NOT NULL,
    "err" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "MTStatus_subscriberId_newsLetterId_key" ON "MTStatus"("subscriberId", "newsLetterId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsSubscribers_unsubscribeToken_key" ON "NewsSubscribers"("unsubscribeToken");
