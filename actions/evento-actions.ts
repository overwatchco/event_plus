'use server'

import prisma from "@/app/lib/prisma"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { Evento, Items, Requerimiento } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getListContratos } from "./contrato-actions"


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


export const getEventos = async (): Promise<Evento[]> => {
    try {
        const contratos = await getListContratos();

        const eventos = await prisma.evento.findMany({
            where: {
                contratoId: {
                    in: contratos.map(contrato => contrato.id),
                },
            },
        });

        return eventos;
    } catch (error) {
        throw error;
    }
}


export const getEvento = async (eventoId: string): Promise<Evento | null> => {
    try {
        const evento = await prisma.evento.findUnique({
            where: {
                id: eventoId
            },
            include: {
                Items: {
                    include: {
                        Requerimiento: true
                    }
                }
            }
        })

        return evento

    } catch (error) {
        throw error
    }

}