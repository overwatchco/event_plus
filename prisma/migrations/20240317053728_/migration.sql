/*
  Warnings:

  - A unique constraint covering the columns `[contratoId]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_empresaId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Evento_contratoId_key" ON "Evento"("contratoId");

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
