import prisma from "@/app/lib/prisma";
import { Items } from "@prisma/client";



export const obtenerItemsYRequerimientos = async (eventoId?: string): Promise<Items[]> => {
    try {
        const items = await prisma.items.findMany({
            where: {
                eventoId: eventoId
            },
            include: {
                Requerimiento: true
            },
        });
        return items;
    } catch (error) {
        console.error("Error al obtener los Items y Requerimientos:", error)
        throw error
    }
}
