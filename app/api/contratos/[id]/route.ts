import prisma from '@/app/lib/prisma'
import { Contrato } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";


interface Segments {
    params: {
        id: string
    }
}


const getContrato = async (id: string): Promise<Contrato | null> => {
    const contrato = await prisma.contrato.findFirst({ where: { id } })
    return contrato
}

export async function GET(request: Request, { params }: Segments) {

    const contrato = await getContrato(params.id)

    if (!contrato) {
        return NextResponse.json({ message: `Contrato con id ${params.id} no existe` }, { status: 404 })
    }

    return NextResponse.json(contrato)
}


//Esquema para el metodo PUT

const putSchema = yup.object({
    nit: yup.string().optional(),
    objeto: yup.string().optional(),
    empresaId: yup.string().optional()
})

export async function PUT(req: Request, { params }: Segments) {

    const contrato = await getContrato(params.id)

    if (!contrato) {
        return NextResponse.json({ message: `Contrato con id ${params.id} no existe` }, { status: 404 })
    }

    let body
    // Validación
    try {
        body = await req.json()
        await putSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


    // Intenta actualizar la contrato
    try {
        const updatedContrato = await prisma.contrato.update({
            where: { id: params.id },
            data: body
        })

        return NextResponse.json(updatedContrato)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}