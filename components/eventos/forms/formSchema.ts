import { z } from "zod";

const requerimentoSchema = z.object({
    id: z.string(),
    subevento: z.string(),
    item: z.string(),
    fecha: z.date(),
    itemsId: z.string(),
})

const itemsSchema = z.object({
    itemId: z.string(),
    servicio: z.string().min(3, { message: "Debe ingresar mas de 3 caracteres" }),
    descripcion: z
        .string()
        .min(10, { message: "La descripcion debe tener al menos 10 caracteres" })
        .max(2000, { message: "Debe tener menos de 2000 caracteres" }),
    eventoId: z.string(),
    requerimientos: z.array(requerimentoSchema),
})


export const eventoFormSchema = z.object({

    id: z.string(),
    nombre: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(30, {
            message: "El nombre no debe tener mas de 30 caracteres.",
        }),

    descripcion: z
        .string({ required_error: "La descripcion es obligatoria" })
        .min(10, { message: "La descripcion debe tener al menos 10 caracteres" })
        .max(2000, { message: "Debe tener menos de 2000 caracteres" }),
    contratoId: z.string({
        required_error: "Seleccione un contrato",
    }),
    items: z.array(itemsSchema)

})