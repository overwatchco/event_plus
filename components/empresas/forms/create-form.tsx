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
import { addEmpresa } from "@/actions/empresa-actions"
import { empresaFormSchema } from "./formSchema"





// NOTE: Esto tiene que venir de la base de datos

const paises = [
  { label: "Estados Unidos", value: "us" },
  { label: "Francia", value: "fr" },
  { label: "Alemania", value: "de" },
  { label: "España", value: "es" },
  { label: "Portugal", value: "pt" },
  { label: "Rusia", value: "ru" },
  { label: "Japón", value: "ja" },
  { label: "Corea del Sur", value: "ko" },
  { label: "China", value: "zh" },
  { label: "Colombia", value: "co" },
] as const;



const departamentosColombia = [
  { label: "Antioquia", value: "Antioquia" },
  { label: "Bolívar", value: "Bolívar" },
  { label: "Boyacá", value: "Boyacá" },
  { label: "Cauca", value: "Cauca" },
  { label: "Cesar", value: "Cesar" },
  { label: "Chocó", value: "Chocó" },
  { label: "Magdalena", value: "Magdalena" },
] as const;


const ciudadesColombia = [
  { label: "Medellín", value: "Medellín" },
  { label: "Cartagena", value: "Cartagena" },
  { label: "Tunja", value: "Tunja" },
  { label: "Popayán", value: "Popayán" },
  { label: "Valledupar", value: "Valledupar" },
  { label: "Quibdó", value: "Quibdó" },
  { label: "Santa Marta", value: "Santa Marta" },
] as const;



type empresaFormValues = z.infer<typeof empresaFormSchema>

//NOTE: Colocar valor de deafault de id usuario 
const defaultValues: Partial<empresaFormValues> = {
  // userId: "uuid()",
}

interface Props {
  sessionUser: string
}

export function EmpresaForm({ sessionUser }: Props) {
  const form = useForm<empresaFormValues>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: {
      nombre: "",
      nit: "",
      pais: "",
      departamento: "",
      ciudad: "",
      direccion: "",
      telefono: +""
      
    }
  })


  function onSubmit(data: empresaFormValues) {
    addEmpresa(data)
      .then((empresa) => {
        // La promesa se resolvió correctamente
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


        <div className="flex gap-3">
          {/* NOTE: Campo de nombre */}

          <div className="grow">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grow">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Numero de telefono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


        </div>




        {/* NOTE: Este campo tiene que venir de la base de datos 
        y no mostrarse por que no se puede cambiar xd */}
        <div>

          {/* NOTE: Campo Usuario id */}
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Id del usuario" {...field} value={sessionUser} />
                </FormControl>
                <FormDescription>
                  Usuario dueño de la empresa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input placeholder="Direccion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="flex gap-3">
          {/* NOTE: Campo de Pais */}
          <FormField
            control={form.control}
            name="pais"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pais</FormLabel>
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
                          ? paises.find(
                            (pais) => pais.value === field.value
                          )?.label
                          : "Seleccione un pais"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar pais..." />
                      <CommandEmpty>No pais found.</CommandEmpty>
                      <CommandGroup>
                        {paises.map((pais) => (
                          <CommandItem
                            value={pais.label}
                            key={pais.value}
                            onSelect={() => {
                              form.setValue("pais", pais.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                pais.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {pais.label}
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

          {/* NOTE: Campo de Departamento */}
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Departamento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[230px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? departamentosColombia.find(
                            (departamento) => departamento.value === field.value
                          )?.label
                          : "Seleccione un departamento"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar departamento..." />
                      <CommandEmpty>No se encuentra el departamento.</CommandEmpty>
                      <CommandGroup>
                        {departamentosColombia.map((departamento) => (
                          <CommandItem
                            value={departamento.label}
                            key={departamento.value}
                            onSelect={() => {
                              form.setValue("departamento", departamento.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                departamento.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {departamento.label}
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

          {/* NOTE: Campo de Ciudad */}
          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ciudad</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[205px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? ciudadesColombia.find(
                            (ciudad) => ciudad.value === field.value
                          )?.label
                          : "Seleccione una ciudad"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar ciudad..." />
                      <CommandEmpty>No se encuentra la ciuad.</CommandEmpty>
                      <CommandGroup>
                        {ciudadesColombia.map((ciudad) => (
                          <CommandItem
                            value={ciudad.label}
                            key={ciudad.value}
                            onSelect={() => {
                              form.setValue("ciudad", ciudad.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                ciudad.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {ciudad.label}
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
        </div>
        <div className="flex justify-center">

          <Button type="submit" onClick={() => form.setValue("userId", sessionUser)}>Guardar</Button>
        </div>
      </form>
    </Form>
  )
}