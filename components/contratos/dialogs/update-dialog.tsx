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
import { useContrato } from "@/hooks/contratos"

interface Props {
    id: string
}

export function UpdateDialog({ id }: Props) {

    const { contrato } = useContrato(id)


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>Actualizar</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Actualizar contrato con id: {id}</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos del contrato
                    </DialogDescription>
                </DialogHeader>



                {/* contenido de el dialog */}
                <UpdateForm contratoToUpdate={contrato} id={id} />
                {/* contenido de el dialog */}
            </DialogContent>
        </Dialog>
    )
}
