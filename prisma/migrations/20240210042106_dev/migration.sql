/*
  Warnings:

  - Added the required column `nombre` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `telefono` on the `Empresa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "nombre" TEXT NOT NULL,
DROP COLUMN "telefono",
ADD COLUMN     "telefono" INTEGER NOT NULL;
