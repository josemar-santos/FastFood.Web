import { z } from 'zod';

export const updateSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().optional(),
    icon: z.instanceof(FileList).optional()
});

export type UpdateschemaType = z.infer<typeof updateSchema>;