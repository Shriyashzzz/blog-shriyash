-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WebDev', 'Lifestyle', 'GeneralTech', 'Tutorials', 'Security', 'Gaming', 'Entertainment');

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category"[];

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
