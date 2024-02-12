-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REPRESENTANTE', 'USUARIO', 'NONE');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nit" TEXT,
    "cedula" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "objeto" TEXT,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reuniones" (
    "id" TEXT NOT NULL,
    "objetivo" TEXT,
    "contratoId" TEXT NOT NULL,

    CONSTRAINT "Reuniones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actas" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "reunionId" TEXT NOT NULL,

    CONSTRAINT "Actas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requerimientos" (
    "id" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,

    CONSTRAINT "Requerimientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagenes" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "requerimientoId" TEXT NOT NULL,

    CONSTRAINT "Imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nit_key" ON "Usuario"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nit_key" ON "Empresa"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_nit_key" ON "Contrato"("nit");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniones" ADD CONSTRAINT "Reuniones_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actas" ADD CONSTRAINT "Actas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actas" ADD CONSTRAINT "Actas_reunionId_fkey" FOREIGN KEY ("reunionId") REFERENCES "Reuniones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos" ADD CONSTRAINT "Eventos_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requerimientos" ADD CONSTRAINT "Requerimientos_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagenes" ADD CONSTRAINT "Imagenes_requerimientoId_fkey" FOREIGN KEY ("requerimientoId") REFERENCES "Requerimientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
