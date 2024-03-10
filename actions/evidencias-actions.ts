import prisma from "@/app/lib/prisma"


export const addEvidencia = async (
    urlPath: string,
    requerimientoId: string,
    fileKey: string
) => {
    const evidencia = await prisma.imagenInforme.create({
        data: {
            urlPath,
            requerimientoId,
            fileKey
        }
    })
    return evidencia
}
