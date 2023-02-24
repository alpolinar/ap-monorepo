/*
  Warnings:

  - You are about to drop the `ProductCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_productId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "productId" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "ProductCategories";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
