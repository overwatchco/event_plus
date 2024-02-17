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
import { useEmpresa } from "@/hooks/empresas"

interface Props {
    id: string
}

export function UpdateDialog({ id }: Props) {

    //Se llaman los datos de empresa
    const { empresa } = useEmpresa(id)


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
