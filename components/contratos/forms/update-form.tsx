"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Contrato } from "@prisma/client"
import { contratoFormSchema } from "./formSchema"
import { useEmpresasList } from "@/hooks/empresas"
import { updateContrato } from "@/actions/contrato-actions"



type contratoFormValues = z.infer<typeof contratoFormSchema>




interface Props {
    contratoToUpdate: Contrato | null
    id: string
}

export function UpdateForm({ contratoToUpdate, id }: Props) {
    const form = useForm<contratoFormValues>({
        resolver: zodResolver(contratoFormSchema),
        defaultValues: {
            nit: contratoToUpdate?.nit,
            empresaId: contratoToUpdate?.empresaId,
            objeto: contratoToUpdate?.objeto,


        }
    })
    const { listEmpresas } = useEmpresasList()
    // Genera la lista de forma que se pueda usar en el select
    const empresas = listEmpresas?.map(empresa => ({
        label: empresa.nombre,
        value: empresa.id,
    })) || []


    function onSubmit(data: contratoFormValues) {

        updateContrato(id, data)
            .then((empresa) => {
                toast({
                    title: "Empresa creada con éxito",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(empresa, null, 2)}</code>
                        </pre>
                    ),
                });
            })
            .catch((error) => {
                // La promesa tuvo un error
                console.error('Error al crear la empresa:', error);
                toast({
                    title: "Error al crear la empresa",
                });
            });
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                {/* NOTE: Campo de Empresa */}
                <FormField
                    control={form.control}
                    name="empresaId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Empresa</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? empresas.find(
                                                    (empresa) => empresa.value === field.value
                                                )?.label
                                                : "Seleccione un empresa"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Buscar empresa..." />
                                        <CommandEmpty>No empresa found.</CommandEmpty>
                                        <CommandGroup>
                                            {empresas.map((empresa) => (
                                                <CommandItem
                                                    value={empresa.label}
                                                    key={empresa.value}
                                                    onSelect={() => {
                                                        form.setValue("empresaId", empresa.value)
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            empresa.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {empresa.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* NOTE:  Campo de nit */}
                <FormField
                    control={form.control}
                    name="nit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nit</FormLabel>
                            <FormControl>
                                <Input placeholder="Nit" {...field} />
                            </FormControl>
                            <FormDescription>
                                Identificador unico de la empresa
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="objeto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Objetivo</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Objetivo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center">

                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Form >
    )
}