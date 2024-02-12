import prisma from '@/app/lib/prisma'
import { Requerimiento } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";


interface Segments {
    params: {
        id: string
    }
}


const getRequerimiento = async (id: string): Promise<Requerimiento | null> => {
    const requerimiento = await prisma.requerimiento.findFirst({ where: { id } })
    return requerimiento
}

export async function GET(request: Request, { params }: Segments) {

    const requerimiento = await getRequerimiento(params.id)

    if (!requerimiento) {
        return NextResponse.json({ message: `Requerimiento con id ${params.id} no existe` }, { status: 404 })
    }

    return NextResponse.json(requerimiento)
}


//Esquema para el metodo PUT

const putSchema = yup.object({
    nit: yup.string().optional(),
    nombre: yup.string().optional(),
    descripcion: yup.string().optional(),
    eventoId: yup.string().optional(),
})

export async function PUT(req: Request, { params }: Segments) {

    const requerimiento = await getRequerimiento(params.id)

    if (!requerimiento) {
        return NextResponse.json({ message: `Requerimiento con id ${params.id} no existe` }, { status: 404 })
    }

    let body
    // Validación
    try {
        body = await req.json()
        await putSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


    // Intenta actualizar la requerimiento
    try {
        const updatedRequerimiento = await prisma.requerimiento.update({
            where: { id: params.id },
            data: body
        })

        return NextResponse.json(updatedRequerimiento)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}