import { deleteContrato } from "@/actions/contrato-actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    id: string,
    nombre: String
}

export function DeleteAlertDialog({ id, nombre }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Esta seguro de eliminar el contrato {nombre}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion no se puede desahacer. Eliminara permanentemente el contrato.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteContrato(id)}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
