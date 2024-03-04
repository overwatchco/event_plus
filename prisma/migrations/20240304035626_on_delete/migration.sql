-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_contratoId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "Requerimiento" DROP CONSTRAINT "Requerimiento_itemsId_fkey";

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requerimiento" ADD CONSTRAINT "Requerimiento_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
