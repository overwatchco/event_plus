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

import { EmpresaForm } from "../forms/create-form"

import { getUserSessionServer } from "@/auth/actions/auth-actions"

export async function CreateDialog() {
    const user = await getUserSessionServer()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Añadir Empresa</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Añadir Empresa</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos de tu empresa
                    </DialogDescription>
                </DialogHeader>



                {/* contenido de el dialog */}
                <EmpresaForm sessionUser={user?.id ?? "No id"} />
                {/* contenido de el dialog */}
            </DialogContent>
        </Dialog>
    )
}
