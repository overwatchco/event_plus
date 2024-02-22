import { z } from "zod";




export const contratoFormSchema = z.object({
    objeto: z
        .string({ required_error: "El objetivo del contrato es obligatorio" })
        .min(3, {
            message: "El objetivo debe tener al menos 3 caracteres.",
        })
        .max(30, {
            message: "El objetivo no debe tener mas de 30 caracteres.",
        }),

    //TODO: Colocar una validacion del nit de acuerdo a la norma
    nit: z
        .string({ required_error: "El nit es obligatorio" })
        .min(2, { message: "El nit debe tener al menos 10 caracteres" })
        .max(30, { message: "Debe tener menos de 30 caracteres" }),
    empresaId: z.string({
        required_error: "Seleccione una empresa",
    }),

})