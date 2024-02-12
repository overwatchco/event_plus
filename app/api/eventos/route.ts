import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

import * as yup from "yup"

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')


    if (isNaN(take)) {
        return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 400 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 400 })
    }

    try {
        const eventos = await prisma.evento.findMany({ take, skip })
        return NextResponse.json(eventos)
    } catch (error) {
        return NextResponse.json(error, { status: 204 })
    }
}



//Esquema para el metodo POST
const postSchema = yup.object({

    nit: yup.string().required(),
    nombre: yup.string().required(),
    fecha: yup.date().required(),
    contratoId: yup.string().required()

})


export async function POST(req: Request) {
    let body

    // Validación
    try {
        body = await req.json()
        await postSchema.validate(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }

    // Intenta crear la evento
    try {
        const evento = await prisma.evento.create({ data: body })
        return NextResponse.json(evento)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}



