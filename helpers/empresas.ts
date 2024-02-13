import { Empresa } from '@prisma/client'

export const createEmpresa = async (data: {
    nombre: String,
    nit: String,
    pais: String,
    departamento: String,
    ciudad: String,
    direccion: String,
    telefono: Number,
    usuarioId: String
}): Promise<Empresa> => {

    const empresa = await fetch(`/api/empresas`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())

    return empresa
}

export const updateEmpresa = async (data: {
    id: String
    nombre: String,
    nit: String,
    pais: String,
    departamento: String,
    ciudad: String,
    direccion: String,
    telefono: Number,
}): Promise<Empresa> => {

    const empresa = await fetch(`/api/empresas/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())

    return empresa
}



