/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId,category]` on the table `PostCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category";

-- CreateIndex
CREATE UNIQUE INDEX "PostCategory_postId_category_key" ON "PostCategory"("postId", "category");
