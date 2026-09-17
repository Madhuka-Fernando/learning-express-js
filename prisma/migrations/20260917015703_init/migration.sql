/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `Data` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `ExpiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `data` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "CreatedAt",
DROP COLUMN "Data",
DROP COLUMN "ExpiresAt",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
