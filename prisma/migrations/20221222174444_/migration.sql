/*
  Warnings:

  - A unique constraint covering the columns `[internalCode]` on the table `TB_Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalCode]` on the table `TB_ProductFamily` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalCode]` on the table `TB_Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalCode]` on the table `TB_Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalCode]` on the table `TB_Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalCode]` on the table `TB_Supervisor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TB_Product_internalCode_key` ON `TB_Product`(`internalCode`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_ProductFamily_internalCode_key` ON `TB_ProductFamily`(`internalCode`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_Purchase_internalCode_key` ON `TB_Purchase`(`internalCode`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_Seller_internalCode_key` ON `TB_Seller`(`internalCode`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_Store_internalCode_key` ON `TB_Store`(`internalCode`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_Supervisor_internalCode_key` ON `TB_Supervisor`(`internalCode`);
