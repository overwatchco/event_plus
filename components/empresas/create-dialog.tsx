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

import { EmpresaForm } from "./empresa-form"

export function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  variant="secondary">Añadir Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Empresa</DialogTitle>
          <DialogDescription>
            Ingresa los datos de tu empresa
          </DialogDescription>
        </DialogHeader>



        {/* contenido de el dialog */}
        <EmpresaForm/>
        {/* contenido de el dialog */}
      </DialogContent>
    </Dialog>
  )
}
