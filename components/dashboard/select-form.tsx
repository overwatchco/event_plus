'use client'

import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { generateFile } from "@/utils/documentGenerator"
import { getEvento } from "@/actions/evento-actions"

interface Props {
    eventos: {
        id: string;
        nombre: string;
        descripcion: string;
        contratoId: string;
    }[]
}

const FormSchema = z.object({
    evento: z
        .string({
            required_error: "Seleccione un evento",
        })
})


export const SelectForm = ({ eventos }: Props) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })



    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        const evento = await getEvento(data.evento)
        console.log(evento)


        generateFile(evento)

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                    <DialogTitle>Crear archivo de evidencia de un evento</DialogTitle>
                    <DialogDescription>
                        Selecciona un evento y dale click en generar para crear el documento.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="evento"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un evento" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Eventos</SelectLabel>

                                            {
                                                eventos.map((evento =>
                                                    <SelectItem key={evento.id} value={evento.id}>  {evento.nombre}</SelectItem>
                                                ))

                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>

                        )} />
                </div>
                <DialogFooter>
                    <Button type="submit">Generar</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
