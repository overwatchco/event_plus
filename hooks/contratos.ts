import { getContrato, getListContratos, getListContratosByEmpresa } from "@/actions/contrato-actions";
import { Contrato } from "@prisma/client";
import { useEffect, useState } from "react";

export const useContrato = (id: string) => {

    const [contrato, setContrato] = useState<Contrato | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaData = await getContrato(id)
                setContrato(empresaData)
            } catch (error) {
                console.error('Error al obtener la contrato:', error)
            }
        }

        fetchData()
    }, [id])

    return { contrato }

}


export const useContratosList = () => {

    const [listContratos, setContratos] = useState<Contrato[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contratosData = await getListContratos();
                setContratos(contratosData)
            } catch (error) {
                console.error('Error al obtener la lista de empresas:', error)
            }
        }

        fetchData()
    }, [])

    return { listContratos }
}


export const useContratosByEmpresaList = (empresaId?: string) => {

    const [listContratos, setContratos] = useState<Contrato[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contratosData = await getListContratosByEmpresa(empresaId);
                setContratos(contratosData)
            } catch (error) {
                console.error('Error al obtener la lista de empresas:', error)
            }
        }

        fetchData()
    }, [])

    return { listContratos }
}


