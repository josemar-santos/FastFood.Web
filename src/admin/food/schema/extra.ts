import { z } from "zod";

export const CreateExtraSchema = z.object({
    name: z.string().min(1, "O nome do extra é obrigátorio"),
    increase: z.boolean(),
    price: z.string().min(1, "O Preço é obrigátorio")
})

export type ICreateExtraSchema = z.infer<typeof CreateExtraSchema>;