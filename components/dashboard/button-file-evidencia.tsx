
import { getEventos } from "@/actions/evento-actions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { PlusCircledIcon } from "@radix-ui/react-icons"
import { SelectForm } from "./select-form"


export const CreateDocumentoEvidencia = async () => {


    const eventos = await getEventos()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Crear archivo de evidencia
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <SelectForm eventos={eventos}></SelectForm>

            </DialogContent>
        </Dialog>
    )
}
