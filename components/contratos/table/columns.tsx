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


export type Contrato = {
    id: string,
    nit: String,
    empresaId: String,
    objeto: String,

}

export const columns: ColumnDef<Contrato>[] = [

    {
        accessorKey: "nit",
        header: "Nit",
    },

    {
        accessorKey: "empresaId",
        header: "Empresa",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const contrato = row.original

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


                            <UpdateDialog id={contrato.id}></UpdateDialog>

                            <DeleteAlertDialog id={contrato.id} nombre={contrato.id}></DeleteAlertDialog>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >Ver contrato</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
