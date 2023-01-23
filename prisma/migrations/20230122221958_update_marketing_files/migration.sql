/*
  Warnings:

  - You are about to drop the `AdCampaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Daily` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Networks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `AdCampaign`;

-- DropTable
DROP TABLE `Daily`;

-- DropTable
DROP TABLE `Networks`;

-- DropTable
DROP TABLE `Publication`;

-- CreateTable
CREATE TABLE `TB_Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NULL,
    `id_network` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `format` ENUM('IGTV', 'REELS', 'CARROUSSEL', 'STATIC', 'VIDEO') NOT NULL,
    `gainedFollowers` INTEGER NULL,
    `clicks` INTEGER NULL,
    `impressions` INTEGER NULL,
    `likes` INTEGER NULL,
    `shares` INTEGER NULL,
    `saves` INTEGER NULL,
    `reach` INTEGER NULL,
    `profileAccess` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_DailyResults` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_network` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `gainedFollowers` INTEGER NULL,
    `lostFollowers` INTEGER NULL,
    `investedValue` INTEGER NULL,
    `clicks` INTEGER NULL,
    `impressions` INTEGER NULL,
    `engagement` INTEGER NULL,
    `reach` INTEGER NULL,

    UNIQUE INDEX `TB_DailyResults_id_network_date_key`(`id_network`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_Networks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `network` ENUM('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE', 'TIKTOK') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TB_Networks_network_name_key`(`network`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_AdCampaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NULL,
    `goal` VARCHAR(191) NULL,
    `networkName` VARCHAR(191) NOT NULL,
    `networkId` VARCHAR(191) NOT NULL,
    `networkGoal` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,

    UNIQUE INDEX `TB_AdCampaign_networkId_key`(`networkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_AdGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NULL,
    `goal` VARCHAR(191) NULL,
    `networkName` VARCHAR(191) NOT NULL,
    `networkId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `results` INTEGER NOT NULL,
    `id_campaign` INTEGER NOT NULL,
    `audienceId` INTEGER NULL,

    UNIQUE INDEX `TB_AdGroup_networkId_key`(`networkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_Ad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `networkId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `id_group` INTEGER NOT NULL,
    `clicks` INTEGER NULL,
    `impressions` INTEGER NULL,
    `likes` INTEGER NULL,
    `shares` INTEGER NULL,
    `saves` INTEGER NULL,
    `reach` INTEGER NULL,
    `startFollowers` INTEGER NULL,
    `endFollowers` INTEGER NULL,
    `investedValue` INTEGER NULL,
    `id_publication` INTEGER NOT NULL,

    UNIQUE INDEX `TB_Ad_networkId_key`(`networkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TB_Audience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TB_Publication` ADD CONSTRAINT `TB_Publication_id_network_fkey` FOREIGN KEY (`id_network`) REFERENCES `TB_Networks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_DailyResults` ADD CONSTRAINT `TB_DailyResults_id_network_fkey` FOREIGN KEY (`id_network`) REFERENCES `TB_Networks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_AdGroup` ADD CONSTRAINT `TB_AdGroup_id_campaign_fkey` FOREIGN KEY (`id_campaign`) REFERENCES `TB_AdCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_AdGroup` ADD CONSTRAINT `TB_AdGroup_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `TB_Audience`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Ad` ADD CONSTRAINT `TB_Ad_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `TB_AdGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Ad` ADD CONSTRAINT `TB_Ad_id_publication_fkey` FOREIGN KEY (`id_publication`) REFERENCES `TB_Publication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
