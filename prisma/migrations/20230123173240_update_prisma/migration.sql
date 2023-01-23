/*
  Warnings:

  - You are about to drop the column `id_group` on the `TB_Ad` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[networkId]` on the table `TB_Audience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_adGroup` to the `TB_Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `networkId` to the `TB_Audience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TB_Ad` DROP FOREIGN KEY `TB_Ad_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Ad` DROP FOREIGN KEY `TB_Ad_id_publication_fkey`;

-- AlterTable
ALTER TABLE `TB_Ad` DROP COLUMN `id_group`,
    ADD COLUMN `id_adGroup` INTEGER NOT NULL,
    MODIFY `id_publication` INTEGER NULL;

-- AlterTable
ALTER TABLE `TB_AdGroup` MODIFY `results` INTEGER NULL;

-- AlterTable
ALTER TABLE `TB_Audience` ADD COLUMN `networkId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TB_Audience_networkId_key` ON `TB_Audience`(`networkId`);

-- AddForeignKey
ALTER TABLE `TB_Ad` ADD CONSTRAINT `TB_Ad_id_adGroup_fkey` FOREIGN KEY (`id_adGroup`) REFERENCES `TB_AdGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Ad` ADD CONSTRAINT `TB_Ad_id_publication_fkey` FOREIGN KEY (`id_publication`) REFERENCES `TB_Publication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
