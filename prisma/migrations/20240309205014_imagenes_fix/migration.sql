/*
  Warnings:

  - You are about to drop the column `path` on the `ImagenInforme` table. All the data in the column will be lost.
  - You are about to drop the column `imagenInformeId` on the `Requerimiento` table. All the data in the column will be lost.
  - Added the required column `requerimientoId` to the `ImagenInforme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlPath` to the `ImagenInforme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Requerimiento" DROP CONSTRAINT "Requerimiento_imagenInformeId_fkey";

-- AlterTable
ALTER TABLE "ImagenInforme" DROP COLUMN "path",
ADD COLUMN     "requerimientoId" TEXT NOT NULL,
ADD COLUMN     "urlPath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requerimiento" DROP COLUMN "imagenInformeId";

-- AddForeignKey
ALTER TABLE "ImagenInforme" ADD CONSTRAINT "ImagenInforme_requerimientoId_fkey" FOREIGN KEY ("requerimientoId") REFERENCES "Requerimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
