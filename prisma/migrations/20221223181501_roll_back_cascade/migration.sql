-- DropForeignKey
ALTER TABLE `TB_City` DROP FOREIGN KEY `TB_City_id_state_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Product` DROP FOREIGN KEY `TB_Product_id_family_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Purchase` DROP FOREIGN KEY `TB_Purchase_id_seller_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Purchase` DROP FOREIGN KEY `TB_Purchase_id_store_fkey`;

-- DropForeignKey
ALTER TABLE `TB_PurchaseItem` DROP FOREIGN KEY `TB_PurchaseItem_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `TB_PurchaseItem` DROP FOREIGN KEY `TB_PurchaseItem_id_purchase_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Seller` DROP FOREIGN KEY `TB_Seller_id_supervisor_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Store` DROP FOREIGN KEY `TB_Store_id_city_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Store` DROP FOREIGN KEY `TB_Store_id_client_fkey`;

-- DropForeignKey
ALTER TABLE `TB_Store` DROP FOREIGN KEY `TB_Store_id_seller_fkey`;

-- AddForeignKey
ALTER TABLE `TB_City` ADD CONSTRAINT `TB_City_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `TB_State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Store` ADD CONSTRAINT `TB_Store_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `TB_Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Store` ADD CONSTRAINT `TB_Store_id_city_fkey` FOREIGN KEY (`id_city`) REFERENCES `TB_City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Store` ADD CONSTRAINT `TB_Store_id_seller_fkey` FOREIGN KEY (`id_seller`) REFERENCES `TB_Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Purchase` ADD CONSTRAINT `TB_Purchase_id_store_fkey` FOREIGN KEY (`id_store`) REFERENCES `TB_Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Purchase` ADD CONSTRAINT `TB_Purchase_id_seller_fkey` FOREIGN KEY (`id_seller`) REFERENCES `TB_Seller`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_PurchaseItem` ADD CONSTRAINT `TB_PurchaseItem_id_purchase_fkey` FOREIGN KEY (`id_purchase`) REFERENCES `TB_Purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_PurchaseItem` ADD CONSTRAINT `TB_PurchaseItem_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `TB_Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Product` ADD CONSTRAINT `TB_Product_id_family_fkey` FOREIGN KEY (`id_family`) REFERENCES `TB_ProductFamily`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TB_Seller` ADD CONSTRAINT `TB_Seller_id_supervisor_fkey` FOREIGN KEY (`id_supervisor`) REFERENCES `TB_Supervisor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
