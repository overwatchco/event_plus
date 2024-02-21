/*
  Warnings:

  - The `rol` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'REPRESENTANTE', 'USUARIO', 'NONE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "roles" "Roles" NOT NULL DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rol",
ADD COLUMN     "rol" "Roles" NOT NULL DEFAULT 'NONE';

-- DropEnum
DROP TYPE "Role";
