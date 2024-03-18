import prisma from "@/app/lib/prisma"
import { Requerimiento } from "@prisma/client"

export const getRequerimientos = async (): Promise<Requerimiento[]> => {

    try {
        const requerimientos = await prisma.requerimiento.findMany()
        return requerimientos
    }
    catch (error) {
        throw error
    }

}