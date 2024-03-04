-- DropForeignKey
ALTER TABLE "Requerimiento" DROP CONSTRAINT "Requerimiento_imagenInformeId_fkey";

-- AlterTable
ALTER TABLE "Requerimiento" ALTER COLUMN "imagenInformeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Requerimiento" ADD CONSTRAINT "Requerimiento_imagenInformeId_fkey" FOREIGN KEY ("imagenInformeId") REFERENCES "ImagenInforme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
