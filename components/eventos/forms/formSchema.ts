import { z } from "zod";
import { Items, Requerimiento } from "@prisma/client";





const requerimentoSchema = z.object({
    subevento: z.string(),
    item: z.string(),
    fecha: z.date(),
    // itemsId: z.string(), NOTE: Tener en cuenta
})

const itemsSchema = z.object({
    servicio: z.string(),
    requerimientos: z.array(requerimentoSchema),
    descripcion: z.string(),
    // eventoId: z.string(), NOTE: Tener en cuenta
})


export const eventoFormSchema = z.object({
    nombre: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(30, {
            message: "El nombre no debe tener mas de 30 caracteres.",
        }),

    //TODO: Colocar una validacion del nit de acuerdo a la norma
    descripcion: z
        .string({ required_error: "La descripcion es obligatoria" })
        .min(10, { message: "La descripcion debe tener al menos 10 caracteres" })
        .max(2000, { message: "Debe tener menos de 2000 caracteres" }),
    contrtoId: z.string({
        required_error: "Seleccione un contrato",
    }),
    items: z.array(itemsSchema)

})