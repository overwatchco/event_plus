'use server'

import prisma from "@/app/lib/prisma"
import { Empresa } from "@prisma/client"



export const addEmpresa = async (data: {
    nombre: string,
    nit: string,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    telefono: number,
    usuarioId: string
}) => {

    // Intenta crear la empresa
    try {
        const empresa = await prisma.empresa.create({ data })
        return empresa
    } catch (error) {
        return { message: 'Error creado la empresa' }
    }

}