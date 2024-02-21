/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Acta` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Empresa` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Acta" DROP CONSTRAINT "Acta_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Acta" DROP COLUMN "usuarioId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "usuarioId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acta" ADD CONSTRAINT "Acta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
