import prisma from '@/app/lib/prisma'
import { Evento } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";


interface Segments {
    params: {
        id: string
    }
}


const getEvento = async (id: string): Promise<Evento | null> => {
    const evento = await prisma.evento.findFirst({ where: { id } })
    return evento
}

export async function GET(request: Request, { params }: Segments) {

    const evento = await getEvento(params.id)

    if (!evento) {
        return NextResponse.json({ message: `Evento con id ${params.id} no existe` }, { status: 404 })
    }

    return NextResponse.json(evento)
}


//Esquema para el metodo PUT

const putSchema = yup.object({
    nit: yup.string().optional(),
    nombre: yup.string().optional(),
    fecha: yup.date().optional(),
    contratoId: yup.string().optional()
})

export async function PUT(req: Request, { params }: Segments) {

    const evento = await getEvento(params.id)

    if (!evento) {
        return NextResponse.json({ message: `Evento con id ${params.id} no existe` }, { status: 404 })
    }

    let body
    // Validación
    try {
        body = await req.json()
        await putSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


    // Intenta actualizar la evento
    try {
        const updatedEvento = await prisma.evento.update({
            where: { id: params.id },
            data: body
        })

        return NextResponse.json(updatedEvento)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}