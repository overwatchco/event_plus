'use server'

import prisma from "@/app/lib/prisma"

export async function getImages(requerimientoId: string) {

    try {

        const imagenes = await prisma.imagenInforme.findMany(
            {
                where: { requerimientoId }
            }
        )

        return imagenes.map((imagen) => imagen.urlPath)

    } catch (error) {

        throw error
    }


}