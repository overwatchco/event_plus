'use server'

import prisma from "@/app/lib/prisma"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { Evento, Items, Requerimiento } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const addEvento = async (
    eventoData:
        {
            id: string
            nombre: string
            descripcion: string
            contratoId: string

        },
    itemsData: {
        id: string;
        servicio: string;
        descripcion: string;
        eventoId: string;
    }[],
    requerimientoData: {

        id: string;
        subevento: string;
        item: string;
        fecha: Date;
        itemsId: string;

    }[]
) => {

    const evento = await prisma.evento.create({ data: eventoData })
    const items = await prisma.items.createMany({ data: itemsData })
    const requerimientos = await prisma.requerimiento.createMany({ data: requerimientoData })
    revalidatePath('/eventos')
    return { evento, items, requerimientos }
}



// // Actualizar empresa
// export const updateEmpresa = async (
//     idToUpdate: string,
//     data: {
//         nit: string,
//         nombre: string,
//         pais: string,
//         departamento: string,
//         ciudad: string
//         direccion: string,
//         telefono: number,
//     }
// ) => {
//     const empresa = await prisma.empresa.findFirst({ where: { id: idToUpdate } });

//     if (!empresa) {
//         throw `Empresa con id ${idToUpdate} no encontrado`
//     }

//     const updatedEmpresa = await prisma.empresa.update({
//         where: { id: idToUpdate },
//         data
//     });


//     revalidatePath('/empresas')
//     return updatedEmpresa
// };





// // // Obtener empresa
// // export const getEmpresa = async (id: string): Promise<Empresa> => {

// //     const empresa = await prisma.empresa.findFirst({ where: { id } })

// //     if (!empresa) {
// //         throw `Empresa con id ${id} no encontrado`
// //     }

// //     return empresa
// // }


// // //Eliminar empresa

// // export const deleteEmpresa = async (id: string): Promise<void> => {


// //     await prisma.empresa.delete({ where: { id } })
// //     revalidatePath('/empresas')

// // }


// // //Get empresas 
// // export const getListEmpresa = async (): Promise<Empresa[]> => {

// //     const usuario = await getUserSessionServer()

// //     const empresas = await prisma.empresa.findMany({ orderBy: { nombre: 'asc' }, where: { userId: usuario?.id } })
// //     if (!empresas) {
// //         throw `No hay empresas registradas`
// //     }

// //     return empresas
// // }
