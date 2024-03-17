'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useContratosList } from "@/hooks/contratos";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { addEvento } from "@/actions/evento-actions";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { eventoFormSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const eventoId = uuidv4()

type eventoFormValues = z.infer<typeof eventoFormSchema>


export default function CreateForm() {


  const form = useForm<eventoFormValues>({
    resolver: zodResolver(eventoFormSchema),
    defaultValues: {
      nombre: "",


    },
  })

  //Se obtienen los datos de los contratos
  const { listContratos } = useContratosList()

  // Genera la lista de forma que se pueda usar en el select
  const contratos = listContratos?.map(contrato => ({
    label: contrato.nit,
    value: contrato.id,
  })) || []


  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control
  });


  function onSubmit(data: eventoFormValues) {


    const eventoData = {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      contratoId: data.contratoId,
    }

    const itemsData = data.items.map(item => ({
      id: item.itemId,
      servicio: item.servicio,
      descripcion: item.descripcion,
      eventoId: item.eventoId
    }))

    const requerimientoData = data.items.flatMap(item =>
      item.requerimientos.map(nestedItem => ({
        id: nestedItem.id,
        subevento: nestedItem.subevento,
        item: nestedItem.item,
        fecha: new Date(nestedItem.fecha),
        itemsId: nestedItem.itemsId
      }))
    )

    console.log(data)




    addEvento(eventoData, itemsData, requerimientoData)
      .then((evento) => {
        toast({
          title: "Evento creado con éxito",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(evento, null, 2)}</code>
            </pre>
          ),
        })
      })
      .catch((error) => {
        // La promesa tuvo un error
        console.error('Error al crear el evento:', error);
        toast({
          title: "Error al crear el evento",
        })
      })


  }
  const addNestedArray = (index: number) => {
    const newArray = [...fields];
    newArray[index].requerimientos.push({
      id: uuidv4(),
      subevento: "",
      item: "",
      fecha: new Date(),
      itemsId: newArray[index].itemId
    })
    form.setValue('items', newArray)
  }

  const removeNestedArray = (index: number, nestedIndex: number) => {
    const newArray = [...fields]
    newArray[index].requerimientos.splice(nestedIndex, 1)
    form.setValue('items', newArray)
  }



  return (

    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
          control={form.control}
          name={"nombre"}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Evento</FormLabel>
              <FormControl>
                <Input placeholder="Evento" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"id"}
          defaultValue={eventoId}
          render={({ field }) => (
            <FormItem className="mb-5 hidden">
              <FormLabel>Evento id</FormLabel>
              <FormControl>
                <Input placeholder="Evento" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NOTE: Campo de Empresa */}
        <FormField
          control={form.control}
          name="contratoId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Contrato</FormLabel>
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
                        ? contratos.find(
                          (contrato) => contrato.value === field.value
                        )?.label
                        : "Seleccione un contrato"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar contrato..." />
                    <CommandEmpty>No contrato found.</CommandEmpty>
                    <CommandGroup>
                      {contratos.map((contrato) => (
                        <CommandItem
                          value={contrato.label}
                          key={contrato.value}
                          onSelect={() => {
                            form.setValue("contratoId", contrato.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              contrato.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {contrato.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"descripcion"}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripcion del evento"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />


        {fields.map((item: any, index) => (


          <div key={index}>
            <FormField
              control={form.control}
              name={`items.${index}.servicio`}
              defaultValue={eventoId}
              render={({ field }) => (
                <FormItem key={`servicio-${index}`} className="mb-5">
                  <FormLabel>Servicio</FormLabel>
                  <FormControl>
                    <Input placeholder="Servicio"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`items.${index}.descripcion`}
              defaultValue={eventoId}
              render={({ field }) => (
                <FormItem className="mb-5" key={`descripcion-${index}`}>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripcion del evento"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />


            {item.requerimientos && item.requerimientos.map((nestedItem: any, nestedIndex: any) => (
              <div key={nestedItem.id} className="flex gap-5 my-5">

                <FormField
                  key={`${nestedIndex}${nestedItem}item`}
                  control={form.control}
                  name={`items.${index}.requerimientos.${nestedIndex}.item`}
                  render={({ field }) => (

                    <FormItem>
                      <FormControl>
                        <Input placeholder="Subitem" autoComplete="off"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                  )}
                />

                <FormField
                  key={`${nestedIndex}${nestedItem}subevento`}
                  control={form.control}
                  name={`items.${index}.requerimientos.${nestedIndex}.subevento`}
                  render={({ field }) => (

                    <FormItem>
                      <FormControl>
                        <Input placeholder="Subevento" autoComplete="off"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  key={`${nestedIndex}${nestedItem}fecha`}
                  control={form.control}
                  name={`items.${index}.requerimientos.${nestedIndex}.fecha`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "P")
                              ) : (
                                <span>Fecha del subevento</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  size="icon"
                  type="button"
                  variant="destructive"
                  onClick={() => removeNestedArray(index, nestedIndex)}>
                  <TrashIcon width={20} height={20} />
                </Button>
              </div>

            ))}

            <div className="flex gap-2 mb-2 w-1/6">
              <Button type="button" onClick={() => addNestedArray(index)} className="">
                <PlusCircledIcon height={20} width={20} className="mr-2" />
                Agregar Requerimiento
              </Button>
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                <TrashIcon width={20} height={20} />
                Eliminar Item
              </Button>
            </div>
          </div>
        ))}
        <div className="flex gap-2">

          <Button
            type="button"
            onClick={() => {
              append({
                eventoId: eventoId,
                itemId: uuidv4(),
                servicio: "",
                requerimientos: [],
                descripcion: ""
              })
            }}>

            <PlusCircledIcon
              height={20}
              width={20}
              className="mr-2"
            />
            Agregar Item
          </Button>
        </div>
        <div className="flex justify-center">

          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </Form>

  );
}
