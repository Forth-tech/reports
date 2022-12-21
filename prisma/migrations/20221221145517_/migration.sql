-- CreateTable
CREATE TABLE `Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `network` ENUM('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE', 'TIKTOK') NOT NULL,
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
CREATE TABLE `Daily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `network` ENUM('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE', 'TIKTOK') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `gainedFollowers` INTEGER NULL,
    `lostFollowers` INTEGER NULL,
    `investedValue` INTEGER NULL,
    `clicks` INTEGER NULL,
    `impressions` INTEGER NULL,
    `engagement` INTEGER NULL,
    `reach` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdCampaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `goal` VARCHAR(191) NOT NULL,
    `networkName` VARCHAR(191) NULL,
    `networkId` VARCHAR(191) NULL,
    `networkGoal` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,

    UNIQUE INDEX `AdCampaign_networkName_key`(`networkName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
