/*
  Warnings:

  - Added the required column `Role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `Role` ENUM('SELLER', 'SUPERVISOR', 'MANAGER', 'VIEWER', 'MASTER') NOT NULL;
