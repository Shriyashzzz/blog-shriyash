-- CreateTable
CREATE TABLE "NewsLetterStatus" (
    "subscriberId" INTEGER NOT NULL,
    "NewsLetterId" INTEGER NOT NULL,
    "letterSent" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterStatus_subscriberId_NewsLetterId_key" ON "NewsLetterStatus"("subscriberId", "NewsLetterId");
