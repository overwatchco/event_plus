'use server'

import prisma from "@/app/lib/prisma"
import { Empresa } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const addEmpresa = async (data:
    {
        nombre: string,
        nit: string,
        pais: string,
        departamento: string,
        ciudad: string,
        direccion: string,
        telefono: number,
        usuarioId: string
    }
) => {
    const empresa = await prisma.empresa.create({ data })
    revalidatePath('/empresas')
    return empresa
}



// Actualizar empresa
export const updateEmpresa = async (
    idToUpdate: string,
    data: {
        nit: string,
        nombre: string,
        pais: string,
        departamento: string,
        ciudad: string
        direccion: string,
        telefono: number,
    }
) => {
    const empresa = await prisma.empresa.findFirst({ where: { id: idToUpdate } });

    if (!empresa) {
        throw `Empresa con id ${idToUpdate} no encontrado`
    }

    const updatedEmpresa = await prisma.empresa.update({
        where: { id: idToUpdate },
        data
    });


    revalidatePath('/empresas')
    return updatedEmpresa
};





// Obtener empresa
export const getEmpresa = async (id: string): Promise<Empresa> => {

    const empresa = await prisma.empresa.findFirst({ where: { id } })

    if (!empresa) {
        throw `Empresa con id ${id} no encontrado`
    }

    return empresa
}


//Eliminar empresa

export const deleteEmpresa = async (id: string): Promise<void> => {


    await prisma.empresa.delete({ where: { id } })
    revalidatePath('/empresas')

}