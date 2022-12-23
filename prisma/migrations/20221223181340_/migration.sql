-- DropForeignKey
ALTER TABLE `TB_City` DROP FOREIGN KEY `TB_City_id_state_fkey`;

-- AddForeignKey
ALTER TABLE `TB_City` ADD CONSTRAINT `TB_City_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `TB_State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
