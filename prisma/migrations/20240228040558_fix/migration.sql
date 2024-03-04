/*
  Warnings:

  - You are about to drop the column `fecha` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Requerimiento` table. All the data in the column will be lost.
  - You are about to drop the column `eventoId` on the `Requerimiento` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Requerimiento` table. All the data in the column will be lost.
  - You are about to drop the `Imagen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descripcion` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenInformeId` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemsId` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subevento` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Imagen" DROP CONSTRAINT "Imagen_requerimientoId_fkey";

-- DropForeignKey
ALTER TABLE "Requerimiento" DROP CONSTRAINT "Requerimiento_eventoId_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "fecha",
ADD COLUMN     "descripcion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requerimiento" DROP COLUMN "descripcion",
DROP COLUMN "eventoId",
DROP COLUMN "nombre",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "imagenInformeId" TEXT NOT NULL,
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "itemsId" TEXT NOT NULL,
ADD COLUMN     "subevento" TEXT NOT NULL;

-- DropTable
DROP TABLE "Imagen";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "requerimientos" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Informe" (
    "id" TEXT NOT NULL,
    "portadaPath" TEXT,
    "eventoId" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,

    CONSTRAINT "Informe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenInforme" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "ImagenInforme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requerimiento" ADD CONSTRAINT "Requerimiento_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requerimiento" ADD CONSTRAINT "Requerimiento_imagenInformeId_fkey" FOREIGN KEY ("imagenInformeId") REFERENCES "ImagenInforme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
