import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export function CreateDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Añadir Contrato</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Añadir Contrato</DialogTitle>
                    <DialogDescription>
                        Ingresa datos del contrato
                    </DialogDescription>
                </DialogHeader>



                {/* contenido de el dialog */}
                {/* <EmpresaForm /> */}
                {/* contenido de el dialog */}
            </DialogContent>
        </Dialog>
    )
}
