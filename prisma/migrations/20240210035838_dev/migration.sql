/*
  Warnings:

  - You are about to drop the `Actas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Imagenes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requerimientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reuniones` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Actas" DROP CONSTRAINT "Actas_reunionId_fkey";

-- DropForeignKey
ALTER TABLE "Actas" DROP CONSTRAINT "Actas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Eventos" DROP CONSTRAINT "Eventos_contratoId_fkey";

-- DropForeignKey
ALTER TABLE "Imagenes" DROP CONSTRAINT "Imagenes_requerimientoId_fkey";

-- DropForeignKey
ALTER TABLE "Requerimientos" DROP CONSTRAINT "Requerimientos_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "Reuniones" DROP CONSTRAINT "Reuniones_contratoId_fkey";

-- DropTable
DROP TABLE "Actas";

-- DropTable
DROP TABLE "Eventos";

-- DropTable
DROP TABLE "Imagenes";

-- DropTable
DROP TABLE "Requerimientos";

-- DropTable
DROP TABLE "Reuniones";

-- CreateTable
CREATE TABLE "Reunion" (
    "id" TEXT NOT NULL,
    "objetivo" TEXT,
    "contratoId" TEXT NOT NULL,

    CONSTRAINT "Reunion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acta" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "reunionId" TEXT NOT NULL,

    CONSTRAINT "Acta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requerimiento" (
    "id" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,

    CONSTRAINT "Requerimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "requerimientoId" TEXT NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Imagen_path_key" ON "Imagen"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Reunion" ADD CONSTRAINT "Reunion_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acta" ADD CONSTRAINT "Acta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acta" ADD CONSTRAINT "Acta_reunionId_fkey" FOREIGN KEY ("reunionId") REFERENCES "Reunion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requerimiento" ADD CONSTRAINT "Requerimiento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_requerimientoId_fkey" FOREIGN KEY ("requerimientoId") REFERENCES "Requerimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
