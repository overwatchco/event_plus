/*
  Warnings:

  - Added the required column `fileKey` to the `ImagenInforme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImagenInforme" ADD COLUMN     "fileKey" TEXT NOT NULL;
