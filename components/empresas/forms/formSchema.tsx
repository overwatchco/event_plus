import { z } from "zod";


export const empresaFormSchema = z.object({
    nombre: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(30, {
            message: "El nombre no debe tener mas de 30 caracteres.",
        }),

    //TODO: Colocar una validacion del nit de acuerdo a la norma
    nit: z
        .string({ required_error: "El nit es obligatorio" })
        .min(2, { message: "El nit debe tener al menos 10 caracteres" })
        .max(30, { message: "Debe tener menos de 30 caracteres" }),
    pais: z.string({
        required_error: "Seleccione un pais",
    }),
    departamento: z.string({
        required_error: "Seleccione un departamento",
    }),
    ciudad: z.string({
        required_error: "Seleccione una ciudad",
    }),
    direccion: z.string({
        required_error: "Seleccione una ciudad",
    }),
    telefono: z.coerce.number({
        required_error: "Ingrese un numero telefonico",
    }),
    userId: z.string({
        required_error: "Seleccione una ciudad",
    }),

})
