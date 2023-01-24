/*
  Warnings:

  - A unique constraint covering the columns `[networkId]` on the table `TB_Publication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `networkId` to the `TB_Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TB_Publication` ADD COLUMN `networkId` VARCHAR(191) NOT NULL,
    ADD COLUMN `videoViews` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TB_Publication_networkId_key` ON `TB_Publication`(`networkId`);
