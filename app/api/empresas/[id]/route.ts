import prisma from '@/app/lib/prisma'
import { Empresa } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";


interface Segments {
    params: {
        id: string
    }
}


const getEmpresa = async (id: string): Promise<Empresa | null> => {
    const empresa = await prisma.empresa.findFirst({ where: { id } })
    return empresa
}

export async function GET(request: Request, { params }: Segments) {

    const empresa = await getEmpresa(params.id)

    if (!empresa) {
        return NextResponse.json({ message: `Empresa con id ${params.id} no existe` }, { status: 404 })
    }

    return NextResponse.json(empresa)
}


//Esquema para el metodo PUT

const putSchema = yup.object({
    nombre: yup.string().optional(),
    pais: yup.string().optional(),
    departamento: yup.string().optional(),
    ciudad: yup.string().optional(),
    direccion: yup.string().optional(),
    telefono: yup.number().optional(),
})

export async function PUT(req: Request, { params }: Segments) {

    const empresa = await getEmpresa(params.id)

    if (!empresa) {
        return NextResponse.json({ message: `Empresa con id ${params.id} no existe` }, { status: 404 })
    }

    let body
    // Validación
    try {
        body = await req.json()
        await putSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


    // Intenta actualizar la empresa
    try {
        const updatedEmpresa = await prisma.empresa.update({
            where: { id: params.id },
            data: body
        })

        return NextResponse.json(updatedEmpresa)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}