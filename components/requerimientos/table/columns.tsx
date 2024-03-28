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
import Link from "next/link"


export type Requerimientos = {
    id: string;
    subevento: string;
    item: string;
    fecha: Date;
    itemsId: string;
}

export const columns: ColumnDef<Requerimientos>[] = [
    {
        accessorKey: "subevento",
        header: "Evento",
    },
    {
        accessorKey: "item",
        header: "Item",
    },
    {
        accessorKey: "fecha",
        header: "Fecha",

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

                        </div>
                        <DropdownMenuSeparator />
                        <Link href={"/eventos"} >
                            <DropdownMenuItem asChild >Ver empresa</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
