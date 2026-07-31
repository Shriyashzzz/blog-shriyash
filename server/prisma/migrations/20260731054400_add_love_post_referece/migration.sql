/*
  Warnings:

  - You are about to drop the column `love` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "love";

-- CreateTable
CREATE TABLE "PostLove" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "PostLove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostLove_postId_authorId_key" ON "PostLove"("postId", "authorId");

-- AddForeignKey
ALTER TABLE "PostLove" ADD CONSTRAINT "PostLove_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLove" ADD CONSTRAINT "PostLove_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
