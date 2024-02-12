import prisma from '@/app/lib/prisma'
import { Reunion } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";


interface Segments {
    params: {
        id: string
    }
}


const getReunion = async (id: string): Promise<Reunion | null> => {
    const reunion = await prisma.reunion.findFirst({ where: { id } })
    return reunion
}

export async function GET(request: Request, { params }: Segments) {

    const reunion = await getReunion(params.id)

    if (!reunion) {
        return NextResponse.json({ message: `Reunion con id ${params.id} no existe` }, { status: 404 })
    }

    return NextResponse.json(reunion)
}


//Esquema para el metodo PUT

const putSchema = yup.object({
    objetivo: yup.string().optional(),
    contratoId: yup.string().optional()
})

export async function PUT(req: Request, { params }: Segments) {

    const reunion = await getReunion(params.id)

    if (!reunion) {
        return NextResponse.json({ message: `Reunion con id ${params.id} no existe` }, { status: 404 })
    }

    let body
    // Validación
    try {
        body = await req.json()
        await putSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


    // Intenta actualizar la reunion
    try {
        const updatedReunion = await prisma.reunion.update({
            where: { id: params.id },
            data: body
        })

        return NextResponse.json(updatedReunion)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}