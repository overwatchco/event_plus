"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export type Evento = {
    id: string,
    nombre: String,
    descripcion: String,
    contratoId: String,
}

export const columns: ColumnDef<Evento>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const evento = row.original

            return (
                <Link href={`/evidencias/${evento.id}`}>
                    <Button>Ver evidencias</Button>
                </Link>

            )
        },
    },
]
