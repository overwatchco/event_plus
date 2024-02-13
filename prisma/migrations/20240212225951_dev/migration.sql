/*
  Warnings:

  - Made the column `objeto` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fecha` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Requerimiento` table without a default value. This is not possible if the table is not empty.
  - Made the column `objetivo` on table `Reunion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contrato" ALTER COLUMN "objeto" SET NOT NULL;

-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requerimiento" ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reunion" ALTER COLUMN "objetivo" SET NOT NULL;
