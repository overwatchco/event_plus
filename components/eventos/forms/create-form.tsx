'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { useForm, useFieldArray, Control, FieldValues, UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";


const eventoId = uuidv4()

interface NestedArrayItem {
  subevento: string
  item: string
  fecha: string
  itemId: string
}

interface Item {
  id: string
  servicio: string
  descripcion: string
  eventoId: string
  nestedArray: NestedArrayItem[]
}

export default function Formulario() {

  //Se obtienen los datos de los contratos
  const { listContratos } = useContratosList()

  // Genera la lista de forma que se pueda usar en el select
  const contratos = listContratos?.map(contrato => ({
    label: contrato.nit,
    value: contrato.id,
  })) || []


  const { register, control, handleSubmit, reset, setValue } = useForm<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  const addNestedArray = (index: number) => {
    const newArray = [...fields];
    newArray[index].nestedArray.push({ id: uuidv4(), subevento: "", item: "", fecha: "", itemsId: newArray[index].itemId });
    reset({ items: newArray });
  };

  const removeNestedArray = (index: number, nestedIndex: number) => {
    const newArray = [...fields];
    newArray[index].nestedArray.splice(nestedIndex, 1);
    reset({ items: newArray });
  };



  return (

    <Form {...useForm<FieldValues>()}>

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormItem className="mb-5">
          <FormLabel>Evento</FormLabel>
          <FormControl>
            <Input placeholder="Evento" />
          </FormControl>
          <FormMessage />
        </FormItem>



        {/* NOTE: Campo de Empresa */}
        <FormField
          control={control}
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
                            setValue("empresaId", contrato.value)
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

        <FormItem className="mb-5">
          <FormLabel>Descripcion</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Descripcion del evento"
              className="resize-none"
            />
          </FormControl>
        </FormItem>


        {fields.map((item: any, index) => (
          <div key={uuidv4()}>


            <FormItem key={index} className="mb-5">
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input placeholder="Item"  {...register(`items.${index}.name`)} />
              </FormControl>
              <FormMessage />
            </FormItem>




            {item.nestedArray && item.nestedArray.map((nestedItem: any, nestedIndex: any) => (
              <div key={uuidv4()} className="flex gap-5 my-5">

                <FormItem key={uuidv4() + nestedItem}>
                  <FormControl>
                    <Input placeholder="Subevento"  {...register(`items.${index}.nestedArray.${nestedIndex}.subevento`)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input placeholder="Subitem"  {...register(`items.${index}.nestedArray.${nestedIndex}.item`)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormField
                  control={control}
                  name={`items.${index}.nestedArray.${nestedIndex}.fecha`}
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size="icon" variant="destructive" onClick={() => removeNestedArray(index, nestedIndex)}><TrashIcon width={20} height={20} /></Button>
              </div>

            ))}

            <div className="flex gap-2 mb-2 w-1/6">
              <Button onClick={() => addNestedArray(index)} className="">
                <PlusCircledIcon height={20} width={20} className="mr-2" />
                Agregar Requerimiento
              </Button>
              <Button variant="destructive" onClick={() => remove(index)}>
                <TrashIcon width={20} height={20} />
                Eliminar Item
              </Button>
            </div>
          </div>
        ))}
        <div className="flex gap-2">

          <Button type="button" onClick={() => {
            append({
              eventoId: eventoId,
              itemId: uuidv4(),
              name: "",
              nestedArray: []
            })
          }}>

            <PlusCircledIcon height={20} width={20} className="mr-2" />
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
