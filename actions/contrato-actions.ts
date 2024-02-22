'use server'


import prisma from "@/app/lib/prisma"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { Contrato } from "@prisma/client"
import { revalidatePath } from "next/cache"


//Obtener contratos de las empresas usando el id del usuario
//Solo se muestran los contratos de las empresas de las que el usuario es dueño 
export const getListContratos = async (): Promise<Contrato[]> => {

    const usuario = await getUserSessionServer()

    const empresas = await prisma.empresa.findMany({
        where: {
            userId: usuario?.id,
        },
        include: {
            Contrato: true,
        },
    })
    if (!empresas) {
        throw `No hay empresas registrados`
    }

    const contratos = empresas.map(contrato => contrato.Contrato).flat()

    return contratos
}



//Crear contrato

export const addContrato = async (data: {
    nit: string,
    empresaId: string,
    objeto: string
}
) => {
    const contrato = await prisma.contrato.create({ data })
    revalidatePath('/contratos')
    return contrato
}


//Eliminar contrato
export const deleteContrato = async (id: string): Promise<void> => {


    await prisma.contrato.delete({ where: { id } })
    revalidatePath('/contratos')

}


//update contrato
export const updateContrato = async (
    idToUpdate: string,
    data: {
        nit: string,
        objeto: string,
        empresaId: string,
    }
) => {
    const contrato = await prisma.contrato.findFirst({ where: { id: idToUpdate } })

    if (!contrato) {
        throw `Contrato con id ${idToUpdate} no encontrado`
    }

    const updatedContrato = await prisma.contrato.update({
        where: { id: idToUpdate },
        data
    })


    revalidatePath('/contratos')
    return updatedContrato
}



// Obtener contrato
export const getContrato = async (id: string): Promise<Contrato> => {

    const contrato = await prisma.contrato.findFirst({ where: { id } })

    if (!contrato) {
        throw `Contrato con id ${id} no encontrado`
    }

    return contrato
}



