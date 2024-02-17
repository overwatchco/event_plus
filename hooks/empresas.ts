import { getEmpresa, getListEmpresa } from "@/actions/empresa-actions";
import { Empresa } from "@prisma/client";
import { useEffect, useState } from "react";



export const useEmpresasList = () => {

    const [listEmpresas, setEmpresas] = useState<Empresa[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresasData = await getListEmpresa();
                setEmpresas(empresasData)
            } catch (error) {
                console.error('Error al obtener la lista de empresas:', error)
            }
        }

        fetchData()
    }, [])

    return { listEmpresas }
}



export const useEmpresa = (id: string) => {

    const [empresa, setEmpresa] = useState<Empresa | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaData = await getEmpresa(id)
                setEmpresa(empresaData)
            } catch (error) {
                console.error('Error al obtener la empresa:', error)
            }
        }

        fetchData()
    }, [id])

    return { empresa }

}


