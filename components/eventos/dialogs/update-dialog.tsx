import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { UpdateForm } from "../forms/update-form"
import { getEmpresa } from "@/actions/empresa-actions"
import { useEffect, useState } from "react"
import { Empresa } from "@prisma/client"

interface Props {
    id: string
}

export function UpdateDialog({ id }: Props) {
    const [empresa, setEmpresa] = useState<Empresa | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaData = await getEmpresa(id);
                setEmpresa(empresaData);
                console.log(empresa)
            } catch (error) {
                // Maneja el error de la promesa según sea necesario
                console.error('Error al obtener la empresa:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>Actualizar</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Actualizar Empresa con id: {id}</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos de tu empresa
                    </DialogDescription>
                </DialogHeader>



                {/* contenido de el dialog */}
                <UpdateForm empresaToUpdate={empresa} id={id} />
                {/* contenido de el dialog */}
            </DialogContent>
        </Dialog>
    )
}
