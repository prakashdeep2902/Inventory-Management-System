/*
  Warnings:

  - You are about to drop the column `price` on the `orderitem` table. All the data in the column will be lost.
  - Added the required column `subtotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `price`,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `unitPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
