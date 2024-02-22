import { getContrato, getListContratos } from "@/actions/contrato-actions";
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


