/*
  Warnings:

  - You are about to drop the column `unsubscribeToken` on the `NewsSubscribers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userToken]` on the table `NewsSubscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userToken` to the `NewsSubscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NewsSubscribers_unsubscribeToken_key";

-- AlterTable
ALTER TABLE "NewsSubscribers" DROP COLUMN "unsubscribeToken",
ADD COLUMN     "userToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsSubscribers_userToken_key" ON "NewsSubscribers"("userToken");
