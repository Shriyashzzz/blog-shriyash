/*
  Warnings:

  - Added the required column `unsubscribeToken` to the `NewsSubscribers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewsSubscribers" ADD COLUMN     "unsubscribeToken" TEXT NOT NULL;
