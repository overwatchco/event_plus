-- DropForeignKey
ALTER TABLE "ImagenInforme" DROP CONSTRAINT "ImagenInforme_requerimientoId_fkey";

-- AddForeignKey
ALTER TABLE "ImagenInforme" ADD CONSTRAINT "ImagenInforme_requerimientoId_fkey" FOREIGN KEY ("requerimientoId") REFERENCES "Requerimiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
