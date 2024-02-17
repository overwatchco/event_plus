"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



import { UpdateDialog } from "../dialogs/update-dialog"
import { DeleteAlertDialog } from "../dialogs/delete-dialog"


export type Empresa = {
    id: string,
    nombre: String,
    nit: String,
    pais: String,
    departamento: String,
    ciudad: String,
    direccion: String,
    telefono: Number,
}

export const columns: ColumnDef<Empresa>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "nit",
        header: "Nit",
    },
    {
        accessorKey: "pais",
        header: "Pais",
    },
    {
        accessorKey: "departamento",
        header: "Departamento",
    },
    {
        accessorKey: "ciudad",
        header: "Ciudad",
    },
    {
        accessorKey: "direccion",
        header: "Direccion",
    },
    {
        accessorKey: "telefono",
        header: "Telefono",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const empresa = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <div className="flex flex-col justify-center">
                            <DropdownMenuLabel className="text-center">Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />


                            <UpdateDialog id={empresa.id}></UpdateDialog>

                            <DeleteAlertDialog id={empresa.id} nombre={empresa.nombre}></DeleteAlertDialog>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >Ver empresa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
