import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { UpdateForm } from "../forms/update-form"

interface Props {
    id: string
}

export function DeleteDialog({ id }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>Eliminar</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Actualizar Empresa</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos de tu empresa
                    </DialogDescription>
                </DialogHeader>



                {/* contenido de el dialog */}
                {/* <UpdateForm /> */}
                {/* contenido de el dialog */}
            </DialogContent>
        </Dialog>
    )
}
