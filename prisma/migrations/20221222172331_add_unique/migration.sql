/*
  Warnings:

  - A unique constraint covering the columns `[internalCode]` on the table `TB_Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TB_Client_internalCode_key` ON `TB_Client`(`internalCode`);
